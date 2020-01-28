const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const token = jwt.sign({sub: 'asd1234'}, 'secret_key');
console.log(token)

const decoded_data = jwt.verify(token,'secret_key');
console.log(decoded_data)

// const token = jwt.sign({sub : 'asd1234', exp: Math.floor(Date.now() / 1000 ) + 60} , 'secret_key');
// const decoded_data = jwt.verify(token, 'secret_key');
// console.log(decoded_data.sub)
router.get('/' , function(req, res){
    const requeset_token = req.body.token;
    try{
        jwt.verify(token,'secret_key');
        next();
    }catch{
        res.send('fail');
    }
    // let count = 121233;
    // res.cookie('count', count);
    // res.send(`Cookie : ${count}`);
    // res.render('auth/login');
    // next();
});

router.get('/register', function(req, res){
    res.render('auth/userManage/userRegister');
    next();
});


module.exports = router; 