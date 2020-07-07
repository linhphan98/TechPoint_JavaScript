var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "password",
	database: "SOS_Challenge"
});

connection.connect((err)=> {
if(!err)
	console.log('Connection Established Successfully');
else
	console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listening on port ${port}..`));

// app.get(`/#${id}` , (req, res) => {
// 	connection.query(`select * from restaurants where restaurant_id = "${id}"`, (err) => {
// 		if (!err){
// 			this.restaurant = row;
// 			return this.restaurant
// 		}else{
// 			console.log(err);
// 		}
// 	});
// })

module.exports = connection;