const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const routes = require('./routes/index.js');
const users = require('./routes/auth/users.js');
const session = require('express-session');
const compression = require('compression');
const FileStore = require('session-file-store')(session)

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(compression());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
  cookie:{
    secure: false
  }
}))

const passport = require('./routes/auth/passport.js')(app);

app.post('/users/login_test', passport.authenticate('local',{
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

