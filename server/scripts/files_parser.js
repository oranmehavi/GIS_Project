const fs = require('fs');
const path = require('path');
const client = require('../scripts/db');
const xlsx = require('node-xlsx').default;

const filesPath = './server/data_files/';
async function getFiles() {
    fs.readdir(filesPath, async(error, files) => {
        if (error) {
            console.log(error);
        }

        for (let file of files) {
            await readFile(file);
        }

    })
}

async function readFile(fileName) {

    const workSheetsFromFile = xlsx.parse(path.join(filesPath, fileName));
    let citiesData = [];
    for (let i = 2; i < workSheetsFromFile[0].data.length - 1; i++) {
                let cityData = {};
                cityData.citySymbol = Number(workSheetsFromFile[0].data[i][0]);
                cityData.cityName = workSheetsFromFile[0].data[i][1];
                cityData.cityDistrict = workSheetsFromFile[0].data[i][2];
                cityData.population = workSheetsFromFile[0].data[i][7] !== '-' ? workSheetsFromFile[0].data[i][7] : 0;
                cityData.year = Number(fileName.slice(0, 4));
                citiesData.push(cityData);

    }
    await addToCitiesTable(citiesData);
}

async function addToCitiesTable(citiesData) {
    let citiesInDatabase;
    try {
        citiesInDatabase = await client.query("SELECT id,name FROM cities");
    }
    catch (e) {
        throw e;
    }

    await Promise.all(citiesData.map(async city => {
        let cityExistsInDB = citiesInDatabase.rows.find(element => element.id == city.citySymbol);
        if (cityExistsInDB == undefined) {


            try {
                await client.query("INSERT INTO cities(id, name, region) VALUES($1, $2, $3)",
                    [city.citySymbol, city.cityName, city.cityDistrict]);
            }
            catch (e) {
                console.log("error inserting " + city.cityName + ' ' + city.year);
                throw e;
            }
        }
        else if (cityExistsInDB.name !== city.cityName) {
            try {
                await client.query(`UPDATE cities SET "name" = $1 WHERE "id" = $2`,
                    [city.cityName, city.citySymbol]);
            }
            catch (e) {
                console.log("error inserting " + city.cityName + ' ' + city.year);
                throw e;
            }
        }
    }));
}

async function addToHistoricTable(citiesData) {
    // TODO: Insert into history table code
}


function addDataFile(file) {

}

module.exports = {getFiles, addDataFile};