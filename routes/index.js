const express = require('express');
var testDB = require("../lib/db.js")
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/create', function(req, res, next) {
    res.render('create');
});

router.post('/create_process', function(req, res, next) {
    var post = req.body;
    console.log(post)
    testDB.query(`INSERT INTO maintest (text) VALUES(?)`, [post.text],
     function(error, result, fields){
         res.writeHead(302, {Location: `/`});
         res.end();
     })
});

    
module.exports = router; 