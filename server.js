const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(port,'0.0.0.0', error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`)
));