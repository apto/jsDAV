"use strict";

var jsDAV_Handler = require("./../lib/DAV/handler");
var _ = require('underscore');

module.exports = function (server, req, res) {

  //original handler instance.
  //Use this if you want to use any function from there
  var _handler = new jsDAV_Handler(server, req, res);

  var interceptedMethods =
  {
    "GET": {
      "beforeMethod": function (args) {
        console.log('#######  Running before GET - args = ', args);
      },
      "afterMethod": function (args) {
        console.log('#######  Running after GET - args = ', args);
      }
    },

    "HEAD": {
      "beforeMethod": function (args) {
        console.log('#######  Running before HEAD - args = ', args);
      }
    },

    "MOVE": {
      "replaceMethod": function (args) {
        console.log('This will be replacing original MOVE method - args = ', args);
      }
    }
  };

  _(interceptedMethods).keys().forEach(function (methodName) {
    var httpMethod = "http" + methodName.charAt(0) + methodName.toLowerCase().substr(1);

    interceptedMethods[methodName]["originalMethod"] = jsDAV_Handler.prototype[httpMethod];

    if (interceptedMethods[methodName]["originalMethod"]) {
      jsDAV_Handler.prototype[httpMethod] = function () {
        if (interceptedMethods[methodName]["replaceMethod"]) {
          //'arguments' are not really used by the original handler methods
          //But, we are passing this just in case for sending objects across the call chain
          interceptedMethods[methodName]["replaceMethod"](arguments);
        }
        else {
          if (interceptedMethods[methodName]["beforeMethod"]) {
            interceptedMethods[methodName]["beforeMethod"](arguments);
          }
          interceptedMethods[methodName]["originalMethod"].apply(this, arguments);
          if (interceptedMethods[methodName]["afterMethod"]) {
            interceptedMethods[methodName]["afterMethod"](arguments);
          }
        }
      }
    }
  });
  return _handler;
};