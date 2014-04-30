// Express initialization
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('title', 'CheckIt');

// Mongo initialization, setting up a connection to a MongoDB  (on Heroku or localhost)
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb'; // comp20 is the name of the database we are using in MongoDB
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
  db = databaseConnection;
});


//Login Page ------------------------------------------------------------------
app.get('/', function(req, res) {
  res.sendfile('views/login.html');
});

app.get('/loginstyle', function(req, res) {
  res.sendfile('views/loginstyle.css');
});

//User Page -------------------------------------------------------------------
app.get('/myaccount', function(req, res) {
  res.sendfile('views/index.html');
});

app.get('/indexstyle', function(req, res) {
  res.sendfile('views/loginstyle.css');
});

//Quicksplit Page --------------------------------------------------------------
app.get('/quicksplit', function(req, res) {
  res.sendfile('views/quicksplit.html');
});


app.listen(process.env.PORT || 3000);