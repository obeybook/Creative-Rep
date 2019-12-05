var mysql = require("mysql");
var fileDb = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '702525',
    database : 'test'
})
fileDb.connect();
module.exports=fileDb; 