const express = require('express');
const app = express();
const app = express();
const routes = require('./routes/index.js');
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views','./view'); // 뷰 폴더를 ./views 경로로 설정한다.

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});