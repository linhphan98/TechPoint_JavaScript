var mysql = require("./connection");
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(bodyparser.json())
app.use(cors())
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

const Router = require("./id");

app.use(`/`, Router);

app.listen(server_port, server_host , error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${server_port}`)
));