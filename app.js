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

//GET API
app.get('/users', function(req, res) {
  var user = req.query.username;
  db.collection('checkit',function(error, collection){
    collection.find({username : user}).sort({score:-1}).toArray(function(error,items){
      res.send(items);
    });
  });
});

//POST API
app.post('/signup', function(req, res) {
  var collection = db.collection('checkit');
  var email = req.body.email;
  var password = req.body.password;
    collection.insert ({
      'email': email,
      'password': password
    }, function(a, b){res.send("Sucess!")});
});

//Signup Page -----------------------------------------------------------------
app.get('/signup', function(req, res) {
  res.sendfile('views/signup.html');
});

app.get('/signupstyle.css', function(req, res) {
  res.sendfile('views/signupstyle.css')
});


//Login Page ------------------------------------------------------------------
app.get('/', function(req, res) {
  var text = '<!DOCTYPE html> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"> <link rel="stylesheet" href="bootstrap.min.css"> <link rel="stylesheet" href="loginstyle.css"> <title>CheckIt</title> <script> var username; var password; function readUsername() { username = document.getElementById("username").value; console.log(username); window.location.href="http://localhost:3000/myaccount"; } </script> </head> <body> <div class="navbar navbar-inverse navbar-fixed-top" role="navigation"> <div class="container"> <a class="navbar-brand" href="#">CheckIt</a> </div> </div> <div class="container"> <form class="form-signin" role="form"> <h2 class="form-signin-heading">Please sign in</h2> <input type="email" id="username" class="form-control" placeholder="Email Address" required autofocus> <input type="password" class="form-control" onchange="readUsername()" placeholder="Password" required> <label class="checkbox"> <input type="checkbox" value="remember-me"> Remember me </label> <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="readUsername()">Sign in</button> </form> </div> </body> </html>'
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
    var text = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>CheckIt</title> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="description" content=""> <meta name="author" content=""> <!-- Le styles --> <link href="bootstrap.css" rel="stylesheet"> <style type="text/css"> body { padding-top: 60px; padding-bottom: 40px; } .sidebar-nav { padding: 9px 0; } @media (max-width: 980px) { /* Enable use of floated navbar text */ .navbar-text.pull-right { float: none; padding-left: 5px; padding-right: 5px; } } </style> <link href="bootstrap-responsive.css" rel="stylesheet"> <link href="indexstyle.css" rel="stylesheet"> <script src="http://localhost:3000/Chart.js"></script> <script src="http://localhost:3000/mycharts.js"></script> <!-- HTML5 shim, for IE6-8 support of HTML5 elements --> <!--[if lt IE 9]> <script src="../assets/js/html5shiv.js"></script> <![endif]--> </head> <body onload="init()"> <div class="navbar navbar-inverse navbar-fixed-top"> <div class="navbar-inner"> <div class="container-fluid header"> <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="brand" href="#">CheckIt</a> <div class="nav-collapse collapse"> <p class="navbar-text pull-right"> Logged in as <a href="#" class="navbar-link">Username</a> </p> <ul class="nav"> <li class="active"><a href="#">My Account</a></li> <li><a href="http://localhost:3000/quicksplit">QuickSplit</a></li> <li><a href="#about">Find an ATM</a></li> </ul> </div><!--/.nav-collapse --> </div> </div> </div> <div class="container-fluid"> <div class="row-fluid"> <div class="span12"> <h1>My Account</h1> <div class="row-fluid"> <div class="span6"> <h2>Money I Owe</h2> <canvas id="iOwe" width="400" height="400"></canvas> </div><!--/span--> <div class="span6"> <h2>Money Owed</h2> <canvas id="uOwe" width="400" height="400"></canvas> </div><!--/span--> </div><!--/row--> <div class="row-fluid"> <div class="span12"> <h2>Previous Transactions</h2> <table> <tr> <th>Date</th> <th>Partner(s)</th> <th>Amount</th> <th>For</th> </tr> <tr> <td>4/10/14</td> <td>Ming C.</td> <td>$13.25</td> <td>Helens</td> </tr> <tr> <td>3/28/14</td> <td>Jasper D.</td> <td>$12.25</td> <td>Boston Burger Co.</td> </tr> <tr> <td>3/16/14</td> <td>Tyler L.</td> <td>-$2.75</td> <td>Brown n Brew</td> </tr> <tr> <td>3/05/14</td> <td>Briana G.</td> <td>$7.00</td> <td>Chinese Food</td> </tr> <tr> <td>2/28/14</td> <td>Rebecca H.</td> <td>-$25.00</td> <td>Concert Tickets</td> </tr> <tr> <td>2/21/14</td> <td>Nicki T.</td> <td>-$6.75</td> <td>Taxi fare</td> </tr> <tr> <td>1/30/14</td> <td>Lisa F.</td> <td>$8.00</td> <td>Movie Ticket</td> </tr> </table> </div><!--/span--> </div><!--/row--> </div><!--/span--> </div><!--/row--> <hr> </div><!--/.fluid-container--> <!-- Le javascript ================================================== --> <!-- Placed at the end of the document so the pages load faster --> <script src="../assets/js/jquery.js"></script> <script src="../assets/js/bootstrap-transition.js"></script> <script src="../assets/js/bootstrap-alert.js"></script> <script src="../assets/js/bootstrap-modal.js"></script> <script src="../assets/js/bootstrap-dropdown.js"></script> <script src="../assets/js/bootstrap-scrollspy.js"></script> <script src="../assets/js/bootstrap-tab.js"></script> <script src="../assets/js/bootstrap-tooltip.js"></script> <script src="../assets/js/bootstrap-popover.js"></script> <script src="../assets/js/bootstrap-button.js"></script> <script src="../assets/js/bootstrap-collapse.js"></script> <script src="../assets/js/bootstrap-carousel.js"></script> <script src="../assets/js/bootstrap-typeahead.js"></script> </body> </html>';
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

app.get('/Chart.js', function(req, res) {
  res.sendfile('views/Chart.js');
});

app.get('/mycharts.js', function(req, res) {
  res.sendfile('views/mycharts.js');
});



//Quicksplit Page --------------------------------------------------------------
app.get('/quicksplit', function(req, res) {
  res.sendfile('views/quicksplit.html');
});

app.get('/quickSplit.js', function(req, res) {
  res.sendfile('views/quickSplit.js');
});

app.get('/manageQuickSplit.js', function(req, res) {
  res.sendfile('views/manageQuickSplit.js');
});


app.listen(process.env.PORT || 3000);