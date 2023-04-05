/*
TODO: Parse files and filter data and organize into objects function
*/

const express = require('express');
const router = express.Router();
const { getFiles, addDataFile } = require('../scripts/files_parser.js');

router.get('/parsefiles', async function(req,res) {
    await getFiles();
    return res.end();
});

router.put('/', async function(req, res) {

});


module.exports = router;
