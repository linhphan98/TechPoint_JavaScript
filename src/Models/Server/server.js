var mysql = require("./connection");
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(bodyparser.json())
app.use(cors())
const port = process.env.PORT || 3000

const Router = require("./id");

app.use(`/`, Router);

app.listen(port, '0.0.0.0' , error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`)
));