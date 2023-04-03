/*
TODO: Parse files and filter data and organize into objects function
*/

const express = require('express');
const router = express.Router();
const { parseFiles, addDataFile } = require('../scripts/files_parser.js');

router.get('/parsefiles', async function(req,res) {
    parseFiles();
    return res.end();
});

router.put('/', async function(req, res) {

});


module.exports = router;
