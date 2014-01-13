"use strict";

/*
    Example for WebDAV server pass through FTP.
    It needs a running FTP server, with host & user credentials supplied as command line arguments
 */

var jsDAV = require("./../lib/jsdav");
jsDAV.debugMode = true;

function startServer() {
  jsDAV.createServer({
    type: "ftp",
    ftp: {
      host: process.argv[2],
      user: process.argv[3],
      pass: process.argv[4],
      path: process.argv[5]
    }
  }, 8000);
}

startServer();

