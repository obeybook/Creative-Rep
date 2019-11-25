const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {page:'Home', menuId:'home'});
});
    
module.exports = router;