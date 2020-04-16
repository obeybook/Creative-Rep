const express = require('express');
const app = express();
const router = express.Router();
const connection = require("../../lib/db.js");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/' , function(req, res){
    let fmsg = req.flash();
    console.log(fmsg)
    if(fmsg.error){
        res.render('auth/login',{
            loginStatus : fmsg.error,
            loginFail : true
        });
    }else{
        res.render('auth/login');
    }
});

router.get('/register', function(req, res){
    res.render('auth/userManage/userRegister');
});

router.post('/register', function(req, res){
    let userReq = req.body;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(userReq.pwd, salt, function(err, hash) {
            connection.query(`INSERT INTO user_info(_id, password, name, email) VALUES(?, ?, ?, ?)`, 
                [userReq.id, hash, userReq.name, userReq.email] , 
                function(error){
                    if(error){
                        console.log(error)
                    }else{
                        res.redirect('/');
                    }
            })
        })
    })
});

module.exports = router; 