var browserServer = require('./browser-server');
var karma = require('karma').server;
var Promise = require('bluebird');

browserServer.setup().then(run).finally(browserServer.tearDown);

function run(done) {
  return Promise.fromNode(function(callback) {
    karma.start({
      frameworks:['browserify', 'mocha'],
      files:['test/browser-shim.js'],
      preprocessors: {
        'test/browser-shim.js': [ 'browserify' ]
      },
      browserify: {
        debug: true
      },
      browsers:['Chrome'],
      singleRun: true,
      autoWatch: false,
      port:9879
    }, function(exitCode) {
      if (exitCode) {
        callback(new Error('exited with non zero error code'));
      } else {
        callback();
      }
    })
  }).nodeify(done);
}