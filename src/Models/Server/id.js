const express = require("express")
const Router = express.Router();
var mysql = require("./connection");

Router.get("/:id" , (req,res) => {
	mysql.query(`select * from restaurants where restaurant_id = "${req.params.id}"`,(err,rows)=>{
		if(err) throw err;
		res.send({count:rows[0]["numberOfPeople"]})
	})
})

module.exports = Router;