// Benötigte Module einbinden
var express = require('express.io');
var mysql = require('mysql');

//------------------------------------------------------------------------------------------------------------------------------------------------------

// Verbindung zur Datenbank configurieren
var connection = mysql.createConnection({
  host : 'localhost',
  database : 'campusviewer',
  user : '10tastics',
  password : 'projekt'
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Verbindung herstellen
connection.connect();

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Variablen für Webserver Port und eigentlichen Webserver einrichten
var port = 80;
var app = module.exports = express();

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Webserver Configuration
app.configure(function(){
  app.use(express.json()); // to support JSON-encoded bodies
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser()); //Initialize parser for session cookies
  app.use(express.session({
    secret: 'cvsession',
    key: 'cv.sid'
  })); //Session handler
  app.use(app.router); //Router for routing server requests to the defined server functions
  app.use(express.static('../client')); //Static file server which serves static files from the given path
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.configure('production', function(){
  app.use(express.errorHandler());
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Routen anlegen, auf die der Server reagieren soll
app.get('/test', function(req, res){
  res.send('Ich bin ein Test!');
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/user/new', function(req, res){ //Nutzerdaten auslesen
  
var data = req.body;
						
	if (data.password === data.samePassword ) 
	{	
   
	delete data['samePassword'];
  
		//Nutzerdaten in die Tabelle user schreiben
	var query = connection.query('INSERT INTO user SET ?', data, function(err, result) 
	{
				
		if (!err && data.password != "" && data.samePassword != "") 
		{
			// Erfolgsmeldung ausgeben
			// res.send("Nutzer gespeichert.");	
			console.log(data);
			console.log('Nutzer gespeichert.');
		} else {
			console.log('Fehler beim speichern!');
		}
			//res.send('Fehler beim speichern!');
	});
	}	

	else if (data.password != data.samePassword)
	{
		// res.send("Ungleiche Passwörter verwendet!");
		console.log("\n\'" + data.password + "\' stimmt nicht mit \'" + data.samePassword + "\' überein.");
		console.log('Ungleiche Passwörter verwendet!');
	} 
});

app.listen(port); //Port on which the server should listen
// Kleine Ausgabe, das Server konfiguriert ist und gestartet
console.log("CampusViewer Server gestartet..." + port);