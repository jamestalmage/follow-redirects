module.exports = function(){

  var utils = require('./lib/utils');
  var concatJson = utils.concatJson;
  var asPromise = utils.asPromise;
  var Promise = require('bluebird');
  var followRedirects = require('..');
  var http = followRedirects.http;
  var https = followRedirects.https;
  var assert = require('assert');
  var concat = require('concat-stream');

  it('test1 - follows redirects', function (done) {

    http.get('http://localhost:3700/test1/a', testResult).on('error', done);

    function testResult(res) {
        res.on('data', function(chunk) {
          done();
        });

    }
  });
};