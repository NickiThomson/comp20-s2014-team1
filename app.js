// Express initialization
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('title', 'CheckIt');

// Mongo initialization, setting up a connection to a MongoDB (on Heroku or localhost)
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/checkit';
  var mongo = require('mongodb');
  var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
  db = databaseConnection;
});


//Login Page ------------------------------------------------------------------
app.get('/', function(req, res) {
  var text = '<!DOCTYPE html> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"> <link rel="stylesheet" href="bootstrap.min.css"> <link rel="stylesheet" href="loginstyle.css"> <title>CheckIt</title> <script> var username; var password; function readUsername() { username = document.getElementById("username").value; console.log(username); } </script> </head> <body> <div class="navbar navbar-inverse navbar-fixed-top" role="navigation"> <div class="container"> <a class="navbar-brand" href="#">CheckIt</a> </div> </div> <div class="container"> <form class="form-signin" role="form"> <h2 class="form-signin-heading">Please sign in</h2> <input type="email" id="username" class="form-control" placeholder="Email Address" required autofocus> <input type="password" class="form-control" placeholder="Password" required> <label class="checkbox"> <input type="checkbox" value="remember-me"> Remember me </label> <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="readUsername()">Sign in</button> </form> </div> </body> </html>'
  res.send(text);
});


app.get('/loginstyle.css', function(req, res) {
  res.sendfile('views/loginstyle.css');
});

app.get('/bootstrap.min.css', function(req, res) {
  res.sendfile('views/bootstrap.min.css');
});

//User Page -------------------------------------------------------------------
app.get('/myaccount', function(req, res) {
//    db.collection('checkit',function(error, collection){
//    collection.find({username : user}).sort({score:-1}).toArray(function(error,items){
    var text = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>CheckIt</title> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="description" content=""> <meta name="author" content=""> <!-- Le styles --> <link href="http://localhost:3000/bootstrap.css" rel="stylesheet"> <style type="text/css"> body { padding-top: 60px; padding-bottom: 40px; } .sidebar-nav { padding: 9px 0; } @media (max-width: 980px) { /* Enable use of floated navbar text */ .navbar-text.pull-right { float: none; padding-left: 5px; padding-right: 5px; } } </style> <link href="http://localhost:3000/bootstrap-responsive.css" rel="stylesheet"> <link href="http://localhost:3000/indexstyle.css" rel="stylesheet"> <!-- HTML5 shim, for IE6-8 support of HTML5 elements --> <!--[if lt IE 9]> <script src="../assets/js/html5shiv.js"></script> <![endif]--> </head> <body> <div class="navbar navbar-inverse navbar-fixed-top"> <div class="navbar-inner"> <div class="container-fluid header"> <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="brand" href="#">CheckIt</a> <div class="nav-collapse collapse"> <p class="navbar-text pull-right"> Logged in as <a href="#" class="navbar-link">Username</a> </p> <ul class="nav"> <li class="active"><a href="#">My Account</a></li> <li><a href="#about">QuickSplit</a></li> <li><a href="#about">Find an ATM</a></li> </ul> </div><!--/.nav-collapse --> </div> </div> </div> <div class="container-fluid"> <div class="row-fluid"> <div class="span12"> <h1>My Account</h1> <div class="row-fluid"> <div class="span6"> <h2>Money I Owe</h2> <p>Graph goes here</p> </div><!--/span--> <div class="span6"> <h2>Money Owed</h2> <p>Graph goes here</p> </div><!--/span--> </div><!--/row--> <div class="row-fluid"> <div class="span12"> <h2>Previous Transactions</h2> <table> <tr> <th>Date</th> <th>Partner(s)</th> <th>Amount</th> <th>For</th> </tr> <tr> <td>4/10/14</td> <td>Ming</td> <td>$13.25</td> <td>Helens</td> </tr> <tr> <td>3/28/14</td> <td>Jasper</td> <td>$7.00</td> <td>Boston Burger Co.</td> </tr> <tr> <td>3/16/14</td> <td>Tyler</td> <td>-$2.75</td> <td>Brown n Brew</td> </tr> </table> </div><!--/span--> </div><!--/row--> </div><!--/span--> </div><!--/row--> <hr> </div><!--/.fluid-container--> </body> </html> </html>-->';
    res.send(text);
//    });
//  });
});

app.get('/bootstrap.css', function(req, res) {
  res.sendfile('views/bootstrap.css');
});

app.get('/bootstrap-responsive.css', function(req, res) {
  res.sendfile('views/bootstrap-responsive.css');
});

app.get('/indexstyle.css', function(req, res) {
  res.sendfile('views/loginstyle.css');
});

//Quicksplit Page --------------------------------------------------------------
app.get('/quicksplit', function(req, res) {
  res.sendfile('views/quicksplit.html');
});


app.listen(process.env.PORT || 3000);