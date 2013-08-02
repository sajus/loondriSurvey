/*
    File Name: Server.js
    Description: The goal of this file is to execute web based project on node based local server.
    Requirement: You need the most updated version of Node.JS to execute this server.js file.
*/

/*
    ---------------------------------------------------------------------
        Configuration Settings.
    ---------------------------------------------------------------------
*/
/*
    Your gateway page. It's a file that Node will serve if a directory is requested.
*/
var gatewayPage = "index.html";
/*
    Listen: Allows you to bind Node to specific IP addresses and/or
    ports, instead of the default.

    Change this to Listen on specific IP addresses as shown below to
    prevent Apache from glomming onto all bound IP addresses.

*/
var IP = '127.0.0.1';
var listenPort = 8000;

/*
    HTTP: 404 Error message;
*/
var error404 = "The 404 or Not Found error message is a HTTP standard response code indicating that the client was able to communicate with the server, but the server could not find what was requested.\n";
    error404 += "The web site hosting server will typically generate a '404 Not Found' web page when a user attempts to follow a broken or dead link; hence the 404 error is one of the most recognizable errors users can find on the web.\n";
    error404 += "A 404 error should not be confused with 'server not found' or similar errors, in which a connection to the destination server could not be made at all. A 404 error indicates that the requested resource may be available again in the future; however, the fact does not guarantee the same content.\n";

var http = require('http'),
    fs = require('fs'),
    path = require('path');

var requestConnector = function(request, response) {

    if (request.url === '/') {
        request.url = gatewayPage;
    }
    var file = path.join(__dirname,request.url);

    var extname = path.extname(file);
    var contentType = 'text/html';

    switch (extname) {
      case '.js':
          contentType = 'text/javascript';
          break;
      case '.css':
          contentType = 'text/css';
          break;
    }

    path.exists(file, function (exists) {
    if (exists) {
        fs.stat(file, function (error, stats) {
            if(error) {
              throw error;
            }
            if (stats.isFile()) {
              response.writeHead(200, {'Content-Type': contentType});
              fs.createReadStream(file).pipe(response);
            } else {
              response.writeHead(404);
              response.end('Error 404 Not Found\nThe requested resource could not be found but may be available again in the future.\n\n\n\n'+error404);

            }
        });
    } else {
      response.writeHead(404);
      response.end('Error 404 Not Found\nThe requested resource could not be found but may be available again in the future.\n\n\n\n'+error404);
    }
  });
}

var server = http.createServer(requestConnector, function(connect) {
    connect.on('connection', function(stream) {
        console.log('Someone connected!');
    });
    connect.once('connection', function(stream) {
        console.log('We have our first user!');
    });
    connect.on('end', function() {
        console.log('Server disconnected...');
    });
});

server.listen(listenPort, IP, function() {
    console.log("\n\n\tServer is connected on " + IP + ":" + listenPort);
});
