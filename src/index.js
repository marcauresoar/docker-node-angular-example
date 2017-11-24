var express = require('express');
var path = require('path');

// Constants
var PORT = 8080;

// App
var app = express();
/*app.get('/', function (req, res) {
  res.send('Hello world\n');
});*/

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
