const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const methodOverride = require('method-override');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './view'));  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public'))); //동적 파일 경로 설정
app.use('/', routes); //라우팅

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});