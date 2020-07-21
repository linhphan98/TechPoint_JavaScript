const mysql = require('./src/Models/Server/connection.js')
const path = require('path');
const express = require('express');
const app = express();
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.HOST || '0.0.0.0';

app.get("/counter/:id", (req,res) => {
	mysql.query("select * from restaurants where restaurant_id = ?" , [req.params.id],(err,rows)=>{
		if(rows.length == 0){
			res.send({count:'--'})
		}else{
			res.send({count:rows[0]["numberOfPeople"]})
		}
	})
})

// update with arduino
// app.post("/update/:id", (req,res) => {
// 	mysql.query(`select * from restaurants where restaurant_id = "${req.params.id}"`,(err,rows)=>{
// 		if(rows.length == 0){
// 			console.log('Error')
// 		}else{
// 			console.log('Update')
// 		}
// 	})
// })

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(server_port, server_host, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${server_port}`)
));