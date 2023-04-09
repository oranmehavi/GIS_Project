const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const xlsx = require("node-xlsx").default;
const path = require("path");
const client = require("../scripts/db");


const filesPath = './server/data_files/';


router.post('/uploadfile', fileUpload({createParentPath: true}), async function (req, res) {


    try {
        if (req.files) {
            let xlsxFile = req.files.file;

            let historyInDatabase = await client.query("SELECT year FROM historical_data WHERE year= $1",
                                                         [xlsxFile.name.slice(0, 4)]);

            if (historyInDatabase.rows.length > 0) {
                return res.status(500).json({message: 'The data of this file already exists in the DB'});
            }

            let citiesData = [];
            const workSheetsFromFile = xlsx.parse(xlsxFile.data);
            for (let i = 2; i < workSheetsFromFile[0].data.length - 1; i++) {
                let cityData = {};
                cityData.citySymbol = Number(workSheetsFromFile[0].data[i][0]);
                cityData.cityName = workSheetsFromFile[0].data[i][1];
                cityData.cityDistrict = workSheetsFromFile[0].data[i][2];
                cityData.population = workSheetsFromFile[0].data[i][7] !== '-' ? workSheetsFromFile[0].data[i][7] : 0;
                cityData.year = Number(xlsxFile.name.slice(0, 4));
                citiesData.push(cityData);
            }

            await addToCitiesTable(citiesData);
            await addToHistoricTable(citiesData);

            await xlsxFile.mv(filesPath + xlsxFile.name, (err) => {
                if (err) {
                    return res.status(500).json({message: err});
                }
            });

            return res.status(200).json({message: 'File was added to the server and the data to the DB'});
        }
    }

    catch(e) {
        return res.status(500).json({message: e.message});
    }


});

async function addToCitiesTable(citiesData) {

    let citiesInDatabase = await client.query("SELECT id,name FROM cities");

    for (let i = 0; i < citiesData.length; i++) {
        let cityExistsInDB = citiesInDatabase.rows.find(element => element.id == citiesData[i].citySymbol);
        if (cityExistsInDB == undefined) {

            await client.query("INSERT INTO cities(id, name, region) VALUES($1, $2, $3)",
                [citiesData[i].citySymbol, citiesData[i].cityName, citiesData[i].cityDistrict]);

        }
        else if (cityExistsInDB.name !== citiesData[i].cityName) {

            await client.query(`UPDATE cities SET "name" = $1 WHERE "id" = $2`,
                [citiesData[i].cityName, citiesData[i].citySymbol]);

        }
    }

}

async function addToHistoricTable(citiesData) {


    for (let i = 0; i < citiesData.length; i++) {

            await client.query("INSERT INTO historical_data(city_id, year, population) VALUES($1, $2, $3)",
                [citiesData[i].citySymbol, citiesData[i].year, citiesData[i].population]);

    }
}


module.exports = router;