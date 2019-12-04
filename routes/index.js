const express = require('express');
const app = express();
const testDB = require("../lib/db.js")
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

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
    function(error){
        res.redirect([302], '/')
        res.end();
    })
});

    
module.exports = router; 