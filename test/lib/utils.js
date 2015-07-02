var Promise = require('bluebird');
var concat = require('concat-stream');

function redirectsTo(opt_status, path) {
  var args = Array.prototype.slice.call(arguments);
  return function(req, res) {
    res.redirect.apply(res, args);
  }
}
module.exports.redirectsTo = redirectsTo;

function sendsJson(json) {
  return function(req, res) {
    res.json(json);
  }
}
module.exports.sendsJson = sendsJson;

function concatJson(res) {
  return new Promise(function (resolve, reject) {
    if (res.setEncoding) res.setEncoding('utf-8');
    res.pipe(concat( function(string){
      try {
        resolve(JSON.parse(string));
      } catch (e) {
        reject(new Error('error parsing ' + JSON.stringify(string) + '\n caused by: ' + e.message));
      }
    })).on('error', reject);
  });
}
module.exports.concatJson = concatJson;

function asPromise(cb) {
  return function(result) {
    return new Promise(function(resolve, reject) {
      cb(resolve, reject, result);
    });
  }
}
module.exports.asPromise = asPromise;
