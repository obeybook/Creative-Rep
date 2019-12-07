var mysql = require("mysql");
var fileDb = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'test'
})
fileDb.connect();
module.exports=fileDb; 