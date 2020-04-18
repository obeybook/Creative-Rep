const express = require('express');
const app = express();
const router = express.Router();
const connection = require("../../../lib/db.js");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* 좋아요 */
router.post('/:id', function(req, res){
    let userReq = req.body;
        // connection.query(`
        // SELECT count(image_list._id)
        // FROM respect_info 
        // LEFT JOIN image_list
        // ON respect_info.${userReq.detailId} = image_list._id;
        // `, function(error){
            
        // })


    // connection.query(`UPDATE IMAGE_LIST SET respect = respect + 1 WHERE _id=?`, 
    //     [req.params.id], function(error){
    //     if(error){
    //         console.log(error)
    //     }else{
    //         connection.query(`SELECT respect FROM IMAGE_LIST WHERE _id=?`, 
    //             [req.params.id], function(error,each){
    //                 console.log(each[0].respect)
    //                 res.json(each[0].respect);
    //         })
    //     }
    // });
});

module.exports = router; 