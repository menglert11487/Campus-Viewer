#!/bin/env node

// Benötigte Module einbinden
var express = require('express.io');
var mysql = require('mysql');

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Variablen für Webserver Instanz, Server-Port und Server-IP-Adresse
var app = module.exports = express();
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var static_dir = process.env.OPENSHIFT_REPO_DIR ? process.env.OPENSHIFT_REPO_DIR + 'prototype/client' : '../client';

//------------------------------------------------------------------------------------------------------------------------------------------------------

// Verbindung zur Datenbank configurieren
var dbConfig = {
    host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || '10tastics',
    password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'projekt',
    database: 'campusviewer'
};

if (process.env.OPENSHIFT_MYSQL_DB_SOCKET) {
    dbConfig.socketPath = process.env.OPENSHIFT_MYSQL_DB_SOCKET;
    dbConfig.database = 'viewer';
}

// Connection Variable - speichert die Verbindung
var connection;

/**
 * Global mysql connection initialization which also cares for connection loses
 * @return {[type]} [description]
 */
var handleDisconnect = function() {
    connection = mysql.createConnection(dbConfig); // Recreate the connection, since
    // the old one cannot be reused.
    connection.connect(function(err) { // The server is either down
        if (err) { // or restarting (takes a while sometimes).
            console.log('Error when connecting to db:', err);
            setTimeout(handleDisconnect, 3000); // We introduce a delay before attempting to reconnect,
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('Database error: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else { // connnection idle timeout (the wait_timeout
            console.error('Database error: ' + err); // server variable configures this)
        }
    });
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Webserver Configuration
app.configure(function() {
    app.use(express.json()); // to support JSON-encoded bodies
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser()); //Initialize parser for session cookies
    app.use(express.session({
        secret: 'cvsession',
        key: 'cv.sid'
    })); //Session handler
    app.use(app.router); //Router for routing server requests to the defined server functions
    app.use(express.static(static_dir)); //Static file server which serves static files from the given path
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.configure('production', function() {
    app.use(express.errorHandler());
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------
// Hilfsfunktionen

/**
 * Sendet eine Antwort im JSON format an den Client
 * @param  {[type]} res     [description]
 * @param  {[type]} success [description]
 * @param  {[type]} message [description]
 * @param  {[type]} fields  [description]
 * @return {[type]}         [description]
 */
var sendReturn = function(res, success, message, fields) {
    var retVal = {
        'success': success,
        'msg': message
    };

    for (var key in fields) {
        if (fields.hasOwnProperty(key)) {
            retVal[key] = fields[key];
        }
    }

    res.json(retVal);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Routen anlegen, auf die der Server reagieren soll
app.get('/test', function(req, res) {
    res.send('Ich bin ein Test!');
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/user/new', function(req, res) { //Nutzerdaten auslesen

    var data = req.body;

    if (data.password === data.samePassword) {

        delete data['samePassword'];

        //Nutzerdaten in die Tabelle user schreiben
        var query = connection.query('INSERT INTO user SET ?', data, function(err, result) {

            if (!err && data.password != "" && data.samePassword != "") {
                // Erfolgsmeldung ausgeben
                sendReturn(res, true, "Nutzer gespeichert.");
                console.log(data);
                console.log('Nutzer gespeichert.');
            } else {
                sendReturn(res, false, "Fehler beim speichern!");
                console.log('Fehler beim speichern!');
            }
        });
    } else if (data.password != data.samePassword) {
        sendReturn(res, false, "Ungleiche Passwörter verwendet!");
        console.log("\n\'" + data.password + "\' stimmt nicht mit \'" + data.samePassword + "\' überein.");
        console.log('Ungleiche Passwörter verwendet!');
    }
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/user/login', function(req, res) { //Nutzerdaten auslesen
    console.log("Login function called...");

    var data = req.body;

	
    if (data.password && data.username) {
        console.log(data);
        var sql = mysql.format('SELECT * FROM user WHERE password = ? AND username = ?', [data.password, data.username]);
        console.log(sql);
        //Nutzerdaten in die Tabelle user schreiben
        var query = connection.query('SELECT * FROM user WHERE password = ? AND username = ?', [data.password, data.username], function(err, result) { 
            console.log(err);
            if (!err && result.length > 0) {
                // Erfolgsmeldung ausgeben
                sendReturn(res, true, "Login erfolgreich.");
                // Store user information in session
                req.session.user = result;
                console.log(result);
                console.log('Nutzer erfolgreich identifiziert.');
            } else {
                sendReturn(res, false, "Nutzer existiert nicht oder dein Passwort ist falsch!");
                console.log('Keine Übereinstimmung zwischen Nutzerdaten und gespeicherten Nutzern in DB!');
            }
        });
    } else {
        sendReturn(res, false, "Bitte gib sowohl deinen Nutzernamen wie auch dein Passwort an!");
        console.log('Fehlende Daten für Login!');
    }
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/user/logout', function(req, res) { //Nutzerdaten löschen
    console.log("Logout function called...");
    //Destroy the session
    req.session.destroy(function(error) {

        if (error) {
            sendReturn(res, false, error);
        } else {
            sendReturn(res, true, "Du wurdest erfolgreich abgemeldet.");
        }
    });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/comment/new', function(req, res) { //Kommentare auslesen

		var data = req.body;
		
		if (typeof req.session.user == 'undefined')
		{
			console.log('Sie sind nicht eingeloggt!!!');
			
		} else    {
		
		var userid = req.session.user[0].id;
		 
		//Kommentare in die Tabelle user schreiben <--
        var query = connection.query('INSERT INTO `campusviewer`.`comment` (`userid`, `commentary`, `room`) VALUES (?, ?, ?);', [userid, data.commentary, data.room], function(err, result) {

            if (!err) {
                // // Erfolgsmeldung ausgeben <--
                sendReturn(res, true, "Kommentar gespeichert.");
                console.log(data);
                console.log('Kommentar gespeichert.');
            } else {
                sendReturn(res, false, "Fehler beim speichern des Kommentars!");
                console.log('Fehler beim speichern des Kommentars!');
            }
        });
		}
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/comment/showall', function(req, res) { //Kommentare auslesen
	
	var query = connection.query('SELECT c.room, u.username, c.commentary FROM comment AS c INNER JOIN user AS u ON c.userID = u.ID WHERE c.room = ?', [req.body.room], function(err, result) { 
            console.log(err);
            if (!err) {
                // Erfolgsmeldung ausgeben
				
				console.log(result);
				
				var data = new Array(result.length);
				
			for (var i = 0; i < result.length; i++)
			{
				data[i] = {username : result[i].username, commentary : result[i].commentary};
				console.log('\n' + result[i].username + ' schrieb: ' + '\"' + result[i].commentary + '\"');
			}
			
				res.send(data);
			
            } else {
                sendReturn(res, false, 'Kommentare konnte nicht angezeigt werden.');
                console.log('Kommentare konnte nicht angezeigt werden.');
            }
        });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------

//Server starten
app.listen(port, ip_address, function() {
    // Kleine Ausgabe, das Server konfiguriert ist und gestartet
    console.log("CampusViewer Server gestartet... an " + ip_address + ":" + port);
    // Verbindung zur Datenbank herstellen
    handleDisconnect();
});