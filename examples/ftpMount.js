"use strict";

/*
 Example for WebDAV server pass through FTP.
 It needs a running FTP server, with host & user credentials supplied as command line arguments
 */

var jsDAV = require("./../lib/jsdav");
var FtpTree  = require("./../lib/DAV/backends/ftp/tree");
jsDAV.debugMode = true;

function startServer() {
  var tree = FtpTree.new({
    ftp: {
      host: process.argv[2],
      user: process.argv[3],
      pass: process.argv[4],
      path: process.argv[5]
    }
  });

  // Load the http module to create an http server.
  var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
  var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
  });

// Listen on port 8000, IP defaults to 127.0.0.1
  server.listen(8000);

// Put a friendly message on the terminal
  console.log("Server running at http://127.0.0.1:8000/");

  jsDAV.mount({
    tree: tree,
    mount: 'files',
    server: server
  }, 8000);
}

startServer();