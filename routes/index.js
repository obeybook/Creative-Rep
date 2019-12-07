const express = require('express');
const app = express();
const testDB = require("../lib/db.js");
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/img/' })

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
    testDB.query(`SELECT text FROM maintest`, function(error, list){
        res.render('index', {title: list});
        next();
    });
});

router.get('/works', function(req, res, next) {
    res.render('worksCreate');
    next();
});

router.post('/create_process', upload.single('userfile'), function(req, res){
    let file = req.file;
    let result = {
        originalName : file.originalname,
        size : file.size
    };
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });

// router.post('/create_process', function(req, res, next) {
//     var post = req.body;
//     testDB.query(`INSERT INTO maintest (text) VALUES(?)`, [post.text], function(error){
        
//     });
//     res.redirect('/');
//     next();
// });

    

module.exports = router; 