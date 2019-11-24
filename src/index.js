const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const content1 = fs.readFileSync('src/html/main.ejs', 'utf8');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  fs.readFile(`src/html/main.ejs`,function(error,data){
    if(error){
      console.log(error);
    }else{ 
      var hello2 = ejs.render(content1,
        {
           message: "텍스트 메세지" 
        }
      ) 

      res.writeHead(200,{'Content-Type': 'text/html'});
      res.end(hello2);
    }
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});