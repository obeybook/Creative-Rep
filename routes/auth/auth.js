const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const passport = require('./passport.js')(app);

router.post('/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/users',
    failureFlash : true
  })
)

router.get('/logout', function(req, res){
  req.logout();
  req.session.save(function(){
      res.redirect('/users');
  })
});

module.exports = router; 