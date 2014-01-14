"use strict";

/*
    Example for WebDAV server pass through FTP.
    It needs a running FTP server, with host & user credentials supplied as command line arguments
 */

var jsDAV = require("./../lib/jsdav");
var FtpTree  = require("./../lib/DAV/backends/ftp/tree");
jsDAV.debugMode = true;

function startServer() {
  console.log('#### FtpTree = ', FtpTree);
  var tree = FtpTree.new({
    ftp: {
      host: process.argv[2],
      user: process.argv[3],
      pass: process.argv[4],
      path: process.argv[5]
    }
  });

  jsDAV.createServer({
    tree: tree
  }, 8000);
}


startServer();

