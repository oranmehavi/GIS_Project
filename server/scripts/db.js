const {Client} = require('pg');

const client = new Client ({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'gis_db',
});


client.connect();

module.exports = client;