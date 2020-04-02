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
            if(req.isAuthenticated()){
                res.render('index', {
                    imageList : list, 
                    isAuthenticated : req.isAuthenticated(), 
                    authInfo : req.user
                });
            }else{
                res.render('index', {
                    imageList : list,
                    isAuthenticated : req.isAuthenticated()
                });
            }
            next();
        }
    });
});

/* 조회 */
router.get('/works/:id', function(req, res, next){
    connection.query(`SELECT * FROM image_list WHERE _id=?`, [req.params.id], function(error, info){
        if(error){
            console.log(error)
        }else{
            if(req.isAuthenticated()){
                res.render('worksDetail', {
                    detail: info,                     
                    isAuthenticated : req.isAuthenticated(), 
                    authInfo : req.user
                });
            }else{
                res.render('worksDetail', {
                    detail: info
                });
            }
            next();
        }
    });
});

/* 생성페이지 이동 */
router.get('/works', function(req, res, next) {
    if(req.isAuthenticated()){
        res.render('worksCreate', {             
            isAuthenticated : req.isAuthenticated(), 
            authInfo : req.user
        });
    }else{
        res.render('worksCreate');
    }
    next();
});

/* 생성 */
router.post('/works', upload.single('userfile'), function(req, res){
    // let result = {
    //     originalName : file.originalname,
    //     size : file.size,
    //     fileName : file.filename,
    // };
    let file = req.file;
    let userReq = req.body;

    connection.query(`INSERT INTO image_list (title, contents, img, own, respect) VALUES(?, ?, ?, ?, ?)`, 
        [userReq.title, userReq.contents, file.filename, req.user._id, 0], function(error){
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
            console.log(path); 
        } catch(err) {
            console.log(err); 
        }
    }); 
});

/* 수정 */ 
router.put('/works/:id' ,function(req, res){
    connection.query(`SELECT * FROM image_list WHERE _id=?`, [req.params.id], function(error, info){
        if(error){
            console.log(error)
        }else{
            if(req.isAuthenticated()){
                res.render('worksUpdate', {
                    detail: info,                     
                    isAuthenticated : req.isAuthenticated(), 
                    authInfo : req.user
                });
            }else{
                res.render('worksUpdate', {
                    detail: info
                });
            }
            // next();
        }
    });
    console.log('put')
});

// router.post('/create_process', function(req, res, next) {
//     var post = req.body;
//     testDB.query(`INSERT INTO maintest (text) VALUES(?)`, [post.text], function(error){
         
//     });
//     res.redirect('/');
//     next();
// });


    

module.exports = router; 