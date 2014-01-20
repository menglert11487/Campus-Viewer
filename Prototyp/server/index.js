// Benötigte Module einbinden
var express = require('express.io');
var mysql   = require('mysql');

// Verbindung zur Datenbank configurieren
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'campusviewer',
  user     : '10tastics',
  password : 'projekt'
});

// Verbindung herstellen
connection.connect();

// Variablen für Webserver Port und eigentlichen Webserver einrichten
var port = 80;
var app = module.exports = express();

// Webserver Configuration
app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.cookieParser()); //Initialize parser for session cookies
  app.use(express.session({
    secret: 'cvsession',
    key: 'cv.sid'
  })); //Session handler
  app.use(app.router); //Router for routing server requests to the defined server functions
  app.use(express.static('../client')); //Static file server which serves static files from the given path
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Kleine Ausgabe, das Server konfiguriert ist und gestartet
console.log("CampusViewer Server gestartet...");

// Routen anlegen, auf die der Server reagieren soll
app.get('/test', function(req, res){
  res.send('Ich bin ein Test!');
});

app.post('/user/new', function(req, res){
  //Nutzerdaten auslesen
  var data = req.body;
  //Nutzerdaten in die Tabelle user schreiben
  var query = connection.query('INSERT INTO user SET ?', data, function(err, result) {
    if(!err) {
      // Erfolgsmeldung ausgeben
      console.log('Nutzer gespeichert.');
    }
  });

});

app.listen(port); //Port on which the server should listen