const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./routes/index.js');
const users = require('./routes/auth/users.js');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const passport = require('passport'), 
LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

let userData = {
  id : 'test',
  pw : '1111'
}

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore() 
  }))

  passport.use(new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'pw'
    },
    function(username, password, done){
      console.log('LocalStrategy',username,password)
      if(username === userData.id && password === userData.pw){
        console.log('성공')
        return done(null, userData);
      } else { 
        console.log('실패')
        return done(null, false, {
          message: '정보가 올바르지 않음'
        });
      }
    }
  ))

app.post('/users/login_test', 
  passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/users'
  })
)

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './view'));  

app.use(methodOverride('_method')); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); 
app.use('/users', users);  

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});

