const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/index.js');

app.set('view engine', 'pug'); // 템플릿 엔진 설정
app.set('views', path.join(__dirname, './view'));  // 뷰 폴더를 ./views 경로로 설정한다.

app.use(express.static(path.join(__dirname, 'public'))); //동적 파일 경로 설정
app.use('/', routes); //라우팅

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
