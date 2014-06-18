
// Access to Express
var express = require('express'),
    // Access to mysql database
    mysql = require('mysql');

// Create access to express
var app = express();

// Global port counter
var counter = 0;

// Global port variable
var gport = 80;

// Global version
var version = '';


//----------------------Connection config------------------------


// Connection params
// Daten werden später über Maske einlesen
var host = '',
    database = '',
    user = '',
    password = '';


// Conncetion object
var connection = mysql.createConnection({
  host : 'localhost',
  database : 'campusviewer',
  user : '10tastics',
  password : 'projekt'
});


//----------------------DataBaseFunctions------------------------


// Set database params
var dbparams = function(req, res) {
    console.log('Entered params for database');

    // Connection params
    host = req.params.host,
    db = req.params.db,
    user = req.params.user,
    pass = req.params.pass;

    // Check if user is root
    if (user == 'root') {
        pass = ''
    }

    // Conncetion object
    connection = mysql.createConnection({
        host: host,
        database: db,
        user: user,
        password: ''
    });

    // Check params
    console.log('host: ' + host);
    console.log('db: ' + db);
    console.log('user: ' + user);
    console.log('pass: ' + pass);
    console.log('Parameters for database has been set');

    // Connect to db
    connection.connect(function(err) {
        if (err) {
            console.log('Can´t connect to db!');
            return;
        }
        console.log('connected!');
        res.send('Connected!' + '</br>' + 'host: ' + host + '</br>' + 'database: ' + db);
    });
}

// Connect to Database - SELECT User which shall be deleted - close connection
// Sample: url/query/*/table -> SELECT * FROM table
var deleteUser = function(req, res) {
    console.log('Connecting to db...');

    handleDisconnect();

    // SQL query
    //var sqlquery = req.params.sqlquery;
    //connection.query(sqlquery, function(err, rows) {
    var username = req.params.username,
        table = req.params.table;

    console.log('req params: ' + req.params);

    connection.query('DELETE FROM ' + table + ' WHERE USERNAME  = "' + username + '"',
        function(err, rows) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(username + ' is removed from Database ' + table + '.');
            res.send(username + ' is removed from Database ' + table + '.');
        });
}

// Connect to Database - Update User - close connection
var updateUser = function(req, res) {
    console.log('Connecting to db...');

    handleDisconnect();

    var db = req.params.db,
        uname = req.params.uname;
    // SQL query
    connection.query('GRANT ALL PRIVILEGES ON `' + db + '` .* TO ' + uname + '@localhost WITH GRANT OPTION', function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('User permission updated: ', rows);
        res.send('User permission updated to GRANT on' + '</br>' + 'database: ' +
            db + '</br>' + 'to user: ' + uname);
    });
}

// Close connection to database
var dbclose = function(req, res) {
    console.log('Entered close database connection');

    // Close connection
    connection.end(function(err) {
        if (!err) {
            console.log('Connection closed!');
            res.send('Connection terminated');
        }
    });
}

/**
 * Global mysql connection initialization which also cares for connection loses
 * @return {[type]} [description]
 */
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


//----------------------FileSystemFunctions----------------------


// Delete a dicrectory with content
// Sample: url/delete/V1
var deldir = function(req, res) {
    console.log('Entered delete directory function');
    var versionname = req.params.versionname;
    fse.remove('C:\\htdocs\\ci-service\\flin\\' + versionname + '-flin', function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Directory ' + versionname + '-flin' + ' deleted');
        res.send('Directory ' + versionname + '-flin' + ' deleted');
    });
}

// Copy directory named by version
// Sample: url/add/V1
var copydir = function(req, res) {
    console.log('Entered copy directory function');
    var versionname = req.params.versionname;

    fse.copy('C:\\htdocs\\flin\\Current',
        'C:\\htdocs\\ci-service\\flin\\' + versionname + '-flin',
        function(err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Directory ' + versionname + '-flin' + ' created');
            res.send('Directory ' + versionname + '-flin' + ' created');
        });

    counter++;
    console.log('Counter: ' + counter);
    gport++;
    console.log('port for proxy: ' + gport);

    fs.readFile('C:/htdocs/router-map.json', function(err, content) {
        console.log("Reading router-map");
        if (err) {
            console.error(err);
            return;
        }
        try {
            var map = JSON.parse(content);
            updateRouterMap(map, versionname, gport);
        } catch (e) {
            console.error('Invalid JSON file format.')

        }
    });
}



var updateRouterMap = function(map, version, gport) {
    if (!map) {
        return;
    }

    map['flin.informatik.hs-fulda.de/releases/' + version + '-flin'] = '127.0.0.1:' + gport;
    var jsonString = JSON.stringify(map);
    fs.writeFileSync('C:\\htdocs\\router-map.json', jsonString);

    child.stop();
    setTimeout(function() {
        console.log('Timeout 1 sec')
    }, 1000);
    //child.start();
    console.log('restart flin-proxy.js')
}



//----------------------FunctionCalls----------------------------


// FileSystemCalls
app.get('/add/:versionname', copydir);
app.get('/delete/:versionname', deldir);
app.get('/remove/:versionname', deldir);

// DataBaseCalls
app.get('/dbcon/:host/:db/:user/:pass', dbparams);
app.get('/dbopen/:host/:db/:user/:pass', dbparams);
app.get('/deleteUser/:table/:username', deleteUser);
app.get('/updateuser/:db/:uname', updateUser);
app.get('/dbclose/', dbclose);
app.get('/dbquit/', dbclose);


var server = app.listen(gport, function() {
    console.log('Listening on port %d ', server.address().port);
});


//----------------------Documentation----------------------------


/**
 * How to use Database functions
 *
 * Create database:
 * ...url/createdb/dbname
 *
 * Delete database:
 * ...url/deletedb/dbname
 *
 * Connect to a database:
 * ...url/dbcon OR dbopen/host/database/user/pass
 *
 * Disconnect from database
 * ...url/dbclose OR dbquit/
 *
 * SELECT query
 * ...url/query/id/table => SELECT id FROM table
 *
 * Update user permission to GRANT
 * ...url/updateuser/database/name
 *
 */