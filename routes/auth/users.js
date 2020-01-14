const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/' , function(req, res){
    let count = 123;
    console.log(req.cookie)
    // if(req.cookies.count){
    //     count = parseInt(req.cookies.count, 10) + 1;
    // } else { 
    //     count = 0;
    // }
    
    res.cookie('count', count);
    res.send(`Cookie : ${count}`);
    // res.render('auth/login');
    // next();
});

router.get('/register', function(req, res){
    res.render('auth/userManage/userRegister');
    next();
});

module.exports = router; 