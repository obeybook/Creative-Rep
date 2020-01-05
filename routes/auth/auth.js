const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/users' ,function(req, res){
    res.render('worksCreate');
    next();
});

module.exports = router; 