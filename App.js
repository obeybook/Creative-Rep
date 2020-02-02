// const express = require('express');
// const path = require('path');
// const app = express();
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const methodOverride = require('method-override');

// const routes = require('./routes/index.js');
// const auth = require('./routes/auth/users.js');

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, './view'));  

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(methodOverride('_method')); 

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes); 
// app.use('/users', auth);  

// app.listen(3000, function() {
//   console.log('Example app listening on port 3000!')
// });
var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
  var cookies = {};
  if( request.headers.coookie !== undefined ){
    cookies = cookie.parse(request.headers.cookie);
    console.log(cookies);
  }else{
    console.log("fail");
  }
  response.writeHead(200, {
    'Set-Cookie':[
        'yummy_cookie=choco', 
        'tasty_cookie=strawberry',
        `Permanent=cookies; Max-Age=${60*60*24*30}`
    ]
});
  response.end('Cookie!!');
}).listen(3000);