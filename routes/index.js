const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require("../lib/db.js");
const auth = require('../routes/auth/auth.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: function(req, file, cb){
        cb(null, 'public/uploads/img/');
    }, 
    filename: function(req, file, cb){
        const ext = path.extname(file.originalname);
        //파일이름 + 현재시간 + 확장자
        // cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        
        //현재시간 + 확장자
        cb(null, new Date().valueOf() + ext);
    }
})
const upload = multer({ storage: storage});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* 메인 */
router.get('/', function(req, res, next) {
    connection.query(`SELECT * FROM image_list ORDER BY _id DESC`, function(error, list){
        if(error){
            console.log(error)
        }else{
            console.log('/index', req.user);
            if(req.user){
                res.render('index', {imageList : list, logined : true, authInfo : req.user._id});
            }else{
                res.render('index', {imageList : list, logined : false});
            }
            next();
        }
    });
});

/* 조회 */
router.get('/works/:id', function(req, res, next){
    connection.query(`SELECT * FROM image_list WHERE _id= ?`, [req.params.id], function(error, info){
        if(error){
            console.log(error)
        }else{
            res.render('worksDetail', {detail: info});
            next();
        }
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

    connection.query(`INSERT INTO image_list (name) VALUES(?)`, [file.filename], function(error){
        if(error){
            console.log(error)
        }else{
            res.redirect('/');
        }
    });
  });

/* 삭제 */ 
router.delete('/works/:id' ,function(req, res){
    let fileName = req.body.fileName
    connection.query(`DELETE FROM image_list WHERE _id= ?`, [req.params.id], function(error, info){
        let path = `./public/uploads/img/${fileName}`
        try {
            fs.unlinkSync(path);
        } catch(err) {
            console.error(err); 
        }
        res.redirect('/');
    }); 

});
/* 수정 */ 
// router.put('/works/:id' ,function(req, res){
// });

// router.post('/create_process', function(req, res, next) {
//     var post = req.body;
//     testDB.query(`INSERT INTO maintest (text) VALUES(?)`, [post.text], function(error){
         
//     });
//     res.redirect('/');
//     next();
// });


    

module.exports = router; 