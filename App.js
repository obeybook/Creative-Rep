const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const passport = require('./routes/auth/passport.js')(app);

const routes = require('./routes/index.js');
const auth = require('./routes/auth/auth.js');
const users = require('./routes/auth/users.js');

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './view'));  

app.use(methodOverride('_method')); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); 
app.use('/users', users);  
app.use('/auth', auth);  

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});

