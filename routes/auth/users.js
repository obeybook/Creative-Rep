const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/' ,function(req, res){
    res.render('auth/login');
    next();
});

module.exports = router; 