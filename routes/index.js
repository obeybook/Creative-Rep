const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');
const testDB = require("../lib/db.js");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/img/');
    }, 
    filename: function(req, file, cb){
        const ext = path.extname(file.originalname);
        //파일이름 + 현재시간 + 확장자
        cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    }
})
const upload = multer({ storage: storage});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* 메인 */
router.get('/', function(req, res, next) {
    testDB.query(`SELECT * FROM imgtest ORDER BY id DESC`, function(error, list){
        res.render('index', {title: list});
        next();
    });
});

/* 조회 */
router.get('/works/:id', function(req, res, next){
    testDB.query(`SELECT * FROM imgtest WHERE id= ?`, [req.params.id], function(error, info){
        res.render('worksDetail', {detail: info});
        next();
    });
});

/* 생성페이지 이동 */
router.get('/works', function(req, res, next) {
    res.render('worksCreate');
    next();
});

/* 생성 */
router.post('/works', upload.single('userfile'), function(req, res){
    let file = req.file;
    let result = {
        originalName : file.originalname,
        size : file.size,
        fileName : file.filename,
    };

    testDB.query(`INSERT INTO imgtest (name) VALUES(?)`, [file.filename], function(error){
        res.redirect('/');
    });
  });

/* 삭제 */
router.delete('/works/:id' ,function(req, res){
    let fileName = req.body.fileName
    testDB.query(`DELETE FROM imgtest WHERE id= ?`, [req.params.id], function(error, info){
        let path = `./public/uploads/img/${fileName}`
        try {
            fs.unlinkSync(path);
        } catch(err) {
            console.error(err);
        }
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