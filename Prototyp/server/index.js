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

//#################HIER FANGEN DIE FUNKTIONEN DER ANDEREN NODE.JS-DATEIEN AN!!!##########################

//Register-Funktion
//var login = require('/login.js');

//app.post('/login', queryrow);

var queryrow = function(req, res) {
    console.log('Connecting to db...');

    handleDisconnect();

    // SQL query
    //var sqlquery = req.params.sqlquery;
    //connection.query(sqlquery, function(err, rows) {
    var username = req.params.username,
		password = req.params.password;

    console.log('req params: ' + req.params);

    connection.query('SELECT * FROM USER WHERE USERNAME = "' + username + '" AND PASSWORD = "' + password + '"',
        function(err, rows) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Query result: ', rows);
            res.send('Query result', rows);
        });
}

var handleDisconnect = function() {
    con = mysql.createConnection(connection); // Recreate the connection, since
    // the old one cannot be reused.
    con.connect(function(err) { // The server is either down
        if (err) { // or restarting (takes a while sometimes).
            console.log('Error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    con.on('error', function(err) {
        console.log('Database error: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else { // connnection idle timeout (the wait_timeout
            console.error('Database error: ' + err); // server variable configures this)
        }
    });
}

app.get('/queryrow/:username/:password', queryrow);
//#######################################################################################################

//################################################DELETE#################################################
var deleteUser = function(req, res) {
    console.log('Connecting to db...');

    handleDisconnect();

    // SQL query
    //var sqlquery = req.params.sqlquery;
    //connection.query(sqlquery, function(err, rows) {
    var username = req.params.username;

    console.log('req params: ' + req.params);

    connection.query('DELETE FROM USER WHERE USERNAME  = "' + username + '"',
        function(err, rows) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(username + ' is removed from Database \'User\'.');
            res.send(username + ' is removed from Database \'User\'.');
        });
}

app.get('/deleteUser/:username', deleteUser);
//#######################################################################################################

//################################################REGISTRATION###########################################
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
//#######################################################################################################
app.listen(port); //Port on which the server should listen
// Kleine Ausgabe, das Server konfiguriert ist und gestartet
console.log("CampusViewer Server gestartet..." + port);

//-------------------------------------------------------------------------------------------------------------------------------------------------------