require("dotenv").config();
const ws = require('ws');
const {Pool, neonConfig } = require("@neondatabase/serverless");

neonConfig.webSocketConstructor = ws;

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});



module.exports = pool;