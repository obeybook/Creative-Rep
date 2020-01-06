const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const routes = require('./routes/index.js');
const auth = require('./routes/auth/users.js');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './view'));  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); 
app.use('/users', auth);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});