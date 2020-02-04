const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const session = require('express-session')
const FileStore = require('session-file-store')(session)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore() 
}))

router.get('/' , function(req, res){
    res.render('auth/login');
});

router.get('/register', function(req, res){
    res.render('auth/userManage/userRegister');
});

let userData = {
    id : 'test',
    pw : '1111'
}

router.post('/login_test', function(req, res){
    let post = req.body;
    let _id = post.id;
    let _pw = post.pw;

    if( _id === userData.id && _pw === userData.pw){
        // req.session.is_logined = true;
        // req.session.id = userData.id;
        // console.log(req.session.is_logined);
        console.log(req.session);
    }else{
        console.log('실패');
    }
    
})

module.exports = router; 