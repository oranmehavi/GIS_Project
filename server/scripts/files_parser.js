const xlsx = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
const {Client} = require('pg');


const filesPath = './data_files/';
function parseFiles() {
    fs.readdir(filesPath, (error, files) => {
        if (error) {
            console.log(error);
        }
        files.forEach(file =>
            xlsx(path.join(filesPath, file)).then(rows => {
            let rowsCount = rows.length;
            let citiesData = [];

            for (let i = 12; i < rowsCount; i++) {
                let cityData = {};
                cityData.citySymbol = rows[i][0];
                cityData.cityName = rows[i][1];
                cityData.cityDistrict = rows[i][2];
                cityData.population = rows[i][7] !== '-' ? rows[i][7] : 0;
                citiesData.push(cityData);
            }
            console.log(citiesData.length);
        }));
    })
}

function addToCitiesTable(citiesData) {
    // TODO: Insert into cities table code
}

function addToHistoricTable(citiesData) {
    // TODO: Insert into history table code
}


function addDataFile(file) {

}

module.exports = {parseFiles, addDataFile};