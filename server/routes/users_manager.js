const express = require('express');
const router = express.Router();
const client = require('../scripts/db');

router.get('/login', async function(req,res) {

    let is_admin = false;
    try {
        const result = await client.query("SELECT * FROM users WHERE email= $1", [req.body.email]);
        if (result.rows.length === 0) {
            return res.status(500).json({message: 'User does not exist'});
        }
        
        if (result.rows[0].password === req.body.password) {
            if (result.rows[0].is_admin === true) {
                is_admin = true;
            }
            return res.status(200).json({message: 'Logged in successfully', is_admin: is_admin});
        }
        else {
            return res.status(500).json({message: 'Password does not match'});
        }
    }
    catch (e) {
        return res.status(500).json({message: e.message});
    }
});

router.post('/signup', async function(req, res) {
    try {
        const result = await client.query("SELECT user_name FROM users WHERE user_name= $1", [req.body.username]);
        if (result.rows.length === 0) {
            await client.query("INSERT INTO users(user_name, password, email, city, is_admin) VALUES($1, $2, $3, $4, $5)",
                                [req.body.username, req.body.password, req.body.email, req.body.city, false]);

            return res.status(200).json({message: 'Account was added successfully'});
        }
        else {
            return res.status(500).json({message: 'Account already exists'});
        }

    }
    catch (e) {
        return res.status(500).json({message: e.message});
    }
});


module.exports = router;