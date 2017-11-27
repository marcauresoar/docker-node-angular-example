'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const accessories = require('./accessories.js');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {

  res.send('{ "data": "Hello World!" }');
});

app.post('/upload', function(req, res) {
  if (!req.files || !req.files.inputFile)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "inputFile") is used to retrieve the uploaded file
  let sampleFile = req.files.inputFile;

  let fileName = __dirname + '/uploads/input.csv';
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(fileName, function(err) {
    if (err)
      return res.status(500).send(err);

    accessories.processAccessories(fileName, (dataResult) => {
      res.status(200).send(dataResult);
    });
  });
});

app.listen(PORT, HOST);
console.log(`Running server on http://${HOST}:${PORT}`);
