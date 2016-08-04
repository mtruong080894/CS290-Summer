//our configuration of sql + our pool
//standard
var mysql = require('mysql');
var pool = mysql.createPool(
{
	connectionLimit: 10,
	host: 'localhost',	
	user: 'student',
	password: 'default',
	database: 'student',
	dateStrings: 'true'
});

module.exports.pool = pool; 
