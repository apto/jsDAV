/*
 * @package jsDAV
 * @subpackage DAV
 * @copyright Copyright(c) 2011 Ajax.org B.V. <info AT ajax.org>
 * @author Mike de Boer <info AT mikedeboer DOT nl>
 * @license http://github.com/mikedeboer/jsDAV/blob/master/LICENSE MIT License
 */
"use strict";

var jsDAV = require("./../lib/jsdav");
jsDAV.debugMode = true;
var jsDAV_Locks_Backend_FS = require("./../lib/DAV/plugins/locks/fs");

var jsDAV_Handler = require("./../lib/DAV/handler");

var interceptedHandler = function (server, request, response) {

  var DECORATED_HTTP_METHODS = {
    "OPTIONS":1,
    "GET":1,
    "HEAD":1,
    "DELETE":1,
    "PROPFIND":1,
    "MKCOL":1,
    "PUT":1,
    "PROPPATCH":1,
    "COPY":1,
    "MOVE":1,
    "REPORT":1
  };


//  if (internalMethods[method]) {
//    self["http" + method.charAt(0) + method.toLowerCase().substr(1)]();
//  }
//

  var originalHttpGet = jsDAV_Handler.prototype.httpGet;
  jsDAV_Handler.prototype.httpGet = function (){
    console.log('###### Before HTTP Get');
    originalHttpGet.apply(this, arguments);
    console.log('###### After HTTP Get');
  };

  return new jsDAV_Handler(server, request, response);
};

var server = jsDAV.createServer({
    node: __dirname + "/../test/assets",
    locksBackend: jsDAV_Locks_Backend_FS.new(__dirname + "/../test/assets"),
    handler: interceptedHandler//hook in interceptor
}, 7000);

