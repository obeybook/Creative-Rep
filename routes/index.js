const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const qs = require('querystring');
const testDB = require("../lib/db.js");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/img/');
    }, 
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
    testDB.query(`SELECT * FROM imgtest`, function(error, list){
        res.render('index', {title: list});
        next();
    });
});

router.get('/works', function(req, res, next) {
    res.render('worksCreate');
    next();
});

router.get('/works/:id', function(req, res, next){
    testDB.query(`SELECT * FROM imgtest WHERE id= ?`, [req.params.id], function(error, info){
        res.render('worksDetail');
        console.log(info[0].id)
        next();
    });
});

router.post('/works', upload.single('userfile'), function(req, res){
    let file = req.file;
    let result = {
        originalName : file.originalname,
        size : file.size,
        fileName : file.filename,
    };
    testDB.query(`INSERT INTO imgtest (name) VALUES(?)`, [result.fileName], function(error){
        res.redirect('/');
    });
  });

// router.post('/create_process', function(req, res, next) {
//     var post = req.body;
//     testDB.query(`INSERT INTO maintest (text) VALUES(?)`, [post.text], function(error){
        
//     });
//     res.redirect('/');
//     next();
// });

    

module.exports = router; 