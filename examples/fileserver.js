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

var handler = function (server, request, response) {
  new jsDAV_Handler(server, request, response);
};

var server = jsDAV.createServer({
    node: __dirname + "/../test/assets",
    locksBackend: jsDAV_Locks_Backend_FS.new(__dirname + "/../test/assets"),
    handler: handler //hook in interceptor
}, 8000);

