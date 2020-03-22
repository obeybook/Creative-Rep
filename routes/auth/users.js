const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/' , function(req, res){
    res.render('auth/login');
});

router.get('/register', function(req, res){
    res.render('auth/userManage/userRegister');
});


// router.post('/login_test', function(req, res){
//     let post = req.body;
//     let _id = post.id;
//     let _pw = post.pw;

//     if( _id === userData.id && _pw === userData.pw){
//         req.session.is_logined = true;
//         req.session.nickname = userData.id;
//         req.session.save(function(){
//             res.redirect('/');
//         })
//     }else{
//         res.redirect('/');
//     }
    
// })

router.get('/logout', function(req, res){
    req.session.destroy(function(err){
        res.redirect('/');
    })
});
module.exports = router; 