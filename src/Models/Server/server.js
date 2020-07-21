var mysql = require("./connection");
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(bodyparser.json())
app.use(cors())
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.HOST || '0.0.0.0';

app.get("/:id" , (req,res) => {
	mysql.query(`select * from restaurants where restaurant_id = "${req.params.id}"`,(err,rows)=>{
		if(err) throw err;
		res.send({count:rows[0]["numberOfPeople"]})
	})
})

// app.post("/counter", (req,res) => {
// 	var res_id = req.body.id;
// 	var res_counter = req.body.counter;
// 	mysql.query(`update restaurants set numberOfPeople = ${res_counter} where restaurant_id = "${res_id}"`,(err,rows)=>{
// 		if(err) throw err;
// 		console.log('Updated')
// 	})
// })

app.listen(server_port, server_host , error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${server_port}`)
));