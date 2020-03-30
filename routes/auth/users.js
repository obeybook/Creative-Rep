const express = require('express');
const app = express();
const router = express.Router();
const connection = require("../../lib/db.js");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/' , function(req, res){
    res.render('auth/login');
});

router.get('/register', function(req, res){
    res.render('auth/userManage/userRegister');
});

router.post('/register', function(req, res){
    let userReq = req.body;
    connection.query(`INSERT INTO user_info(_id, password, name, email) VALUES(?, md5(?), ?, ?)`, 
        [userReq.id, userReq.pwd, userReq.name, userReq.email] , 
        function(error){
            if(error){
                console.log(error)
            }else{
                res.redirect('/');
            }
    })
});

module.exports = router; 