const express = require('express');
const router = express.Router();
const fs = require('fs');
const client = require('../scripts/db');
const path = require("path");
// const {finalizeSession} = require("pg/lib/sasl");
const xlsx = require('node-xlsx').default;

const filesPath = './data_files/';

router.get('/parsefiles', async function(req,res) {

    const filesList = fs.readdirSync(filesPath);

    for (let file of filesList) {
        let citiesData = [];
        const workSheetsFromFile = xlsx.parse(path.join(filesPath, file));
        for (let i = 2; i < workSheetsFromFile[0].data.length - 1; i++) {
            let cityData = {};
            cityData.citySymbol = Number(workSheetsFromFile[0].data[i][0]);
            cityData.cityName = workSheetsFromFile[0].data[i][1];
            cityData.cityDistrict = workSheetsFromFile[0].data[i][2];
            cityData.population = workSheetsFromFile[0].data[i][7] !== '-' ? workSheetsFromFile[0].data[i][7] : 0;
            cityData.year = Number(file.slice(0, 4));
            citiesData.push(cityData);

        }

        try{
            await addToCitiesTable(citiesData);
            await addToHistoricTable(citiesData);
        }
        catch (e) {
            return res.status(500).json({message: e.message});
        }

    }

    return res.status(200).json({message: 'DB is successfully updated'});

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

    let historyInDatabase = await client.query("SELECT year FROM historical_data");

    for (let i = 0; i < citiesData.length; i++) {
        let historyExistsInDB = historyInDatabase.rows.find(element => element.year == citiesData[i].year);
        if (historyExistsInDB == undefined) {

            await client.query("INSERT INTO historical_data(city_id, year, population) VALUES($1, $2, $3)",
                [citiesData[i].citySymbol, citiesData[i].year, citiesData[i].population]);

        }
    }
}

module.exports = router;
