var express = require('express');
var assert = require('assert');
var server = require('./lib/test-server')(3700, 3701);
var utils = require('./lib/utils');
var redirectsTo = utils.redirectsTo;
var sendsJson = utils.sendsJson;
var followRedirects = require('..');
var cors = require('cors');

var app, app2, originalMaxRedirects;

function setup(done) {
  originalMaxRedirects = followRedirects.maxRedirects;
  app = express();
  app2 = express();

  var corsOptions = {
    origin: 'http://localhost:9879',
    credentials: true
  };

  app.use(cors(corsOptions));
  app2.use(cors(corsOptions));

  // test 1 - follows redirects
  app.get('/test1/a', redirectsTo('/test1/e'));
  //app.get('/test1/b', redirectsTo('/test1/c'));
  //app.get('/test1/c', redirectsTo('/test1/d'));
  //app.get('/test1/d', redirectsTo('/test1/e'));
  app.get('/test1/e', redirectsTo('/test1/f'));
  app.get('/test1/f', sendsJson({a:'b'}));

  return server.start(app, 'http')
    .then(function() {
      return server.start(app2, 'https')
    })
    .nodeify(done);
}

function tearDown(done) {
  followRedirects.maxRedirects = originalMaxRedirects;
  return server.stop().nodeify(done);
}

module.exports = {
  setup: setup,
  tearDown: tearDown
};
