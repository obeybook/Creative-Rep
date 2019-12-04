const express = require('express');
const app = express();
const testDB = require("../lib/db.js");
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
    testDB.query(`SELECT text FROM maintest`, function(error, list){
        console.log(list[0].text)
        res.render('index', {title: list});
        next();
    });
});

router.get('/create', function(req, res, next) {
    res.render('create');
    next();
});

router.post('/create_process', function(req, res, next) {
    var post = req.body;
    testDB.query(`INSERT INTO maintest (text) VALUES(?)`, [post.text], function(error){
        res.redirect('/');
        res.end();
    });
    next();
});

    
module.exports = router; 