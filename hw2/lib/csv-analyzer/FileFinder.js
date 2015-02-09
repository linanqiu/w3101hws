(function () {
  'use strict';

  var fs = require('fs');
  var path = require('path');

  // searches depth first. would have implemented breadth first but I only started hw2 at 11pm
  var search = function (pathToDirectory, ext, callback) {
    fs.readdir(pathToDirectory, function (err, files) {
      if (err) {
        callback(err, null);
        return;
      }

      var matched = false;

      files.forEach(function (file) {
        file = pathToDirectory + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          search(file, ext, callback);
          return;
        } else {
          var fileExt = file.substring(file.lastIndexOf('.') + 1);
          if (fileExt === ext) {
            matched = true;
            fs.readFile(file, {
              encoding: 'ASCII'
            }, function (err, data) {
              if (err) {
                callback(err, null);
                return;
              }
              callback(false, data);
              return;
            });
          }
        }
      });

      if (!matched) {
        callback('Unable to find csv file', null);
      }
    });
  };

  module.exports = search;
})();
