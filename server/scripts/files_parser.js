const xlsx = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
const client = require('../scripts/db');

const filesPath = './server/data_files/';
async function getFiles() {
    fs.readdir(filesPath, async(error, files) => {
        if (error) {
            console.log(error);
        }


        for (let i = 0; i < files.length; i++) {
            await readFile(files[i]);
            // await client.query('COMMIT');
        }




    })
}
async function readFile(fileName) {
    xlsx(path.join(filesPath, fileName)).then(async rows => {
        let rowsCount = rows.length;
        let citiesData = [];

        for (let i = 12; i < rowsCount; i++) {
            let cityData = {};
            cityData.citySymbol = rows[i][0];
            cityData.cityName = rows[i][1];
            cityData.cityDistrict = rows[i][2];
            cityData.population = rows[i][7] !== '-' ? rows[i][7] : 0;
            cityData.year = Number(fileName.slice(0, 4));
            citiesData.push(cityData);
        }
        await addToCitiesTable(citiesData);
    });
}
async function addToCitiesTable(citiesData) {
    // TODO: Insert into cities table code
    const citiesInDatabase = await client.query("SELECT name FROM cities");
    let convertedArr = citiesInDatabase.rows.map(city => city.name);
    console.log(citiesInDatabase.rows.length);


    // for (let i = 0; i < citiesData.length; i++) {
    //     if (convertedArr.includes(citiesData[i].cityName) === false) {
    //         // console.log('does not exist');
    //         await connectionPool.query("INSERT INTO cities(id, name, region) VALUES($1, $2, $3)",
    //                                     [citiesData[i].citySymbol, citiesData[i].cityName, citiesData[i].cityDistrict]);
    //     }
    // }

    await Promise.all(citiesData.map(async city => {
        if (convertedArr.includes(city.cityName) === false) {
                    // console.log('does not exist');
            await client.query("INSERT INTO cities(id, name, region) VALUES($1, $2, $3)",
                                                [city.citySymbol, city.cityName, city.cityDistrict]);
            // await client.query('COMMIT');

        }
    }));

    //console.log(citiesInDatabase.rows);
}



async function addToHistoricTable(citiesData) {
    // TODO: Insert into history table code
}


function addDataFile(file) {

}

module.exports = {getFiles, addDataFile};