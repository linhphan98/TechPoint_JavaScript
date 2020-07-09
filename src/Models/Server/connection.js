var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "dno6xji1n8fm828n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "txpzh1mifchp5uxq",
	password: "zgapwnjg44tygeph",
	database: "xymi20vxow5buos8",
	port: '3306'
});

connection.connect((err)=> {
if(!err)
	console.log('Connection Established Successfully');
else
	console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});


module.exports = connection;
