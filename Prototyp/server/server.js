var http = require('http'),
	url = require('url'),
	sys = require('util');

var handler = require('./lib/Handler.js');

http.createServer(function(request, response) {

	try {
		console.log('Request from: ' +
			request.connection.remoteAddress +
			' | href: ' + url.parse(request.url).href);

		handler.handle(request, response);

	} catch (e) {
		sys.puts(e);
		response.writeHead(500);
		response.end('Internal Server Error');
	}

}).listen(8087, "127.0.0.1", function () {
	console.log("Server running at http://localhost:8087/");
});