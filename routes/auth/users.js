const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/users' ,function(req, res){
    console.log("ㅊㅊ");
});

module.exports = router; 