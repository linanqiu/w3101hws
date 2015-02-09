(function () {
  'use strict';

  // implement your csv-analyzer here
  // make sure to require in only the helper modules that you have
  // created in this directory.  The fs and path modules should be
  // used only inside those helper directories.

  var CsvAnalyzer = function (dir, computeOptions, callback) {
    var fileFinder = require('./FileFinder');
    var CsvParser = require('./CsvParser');

    fileFinder(dir, 'csv', function (err, csvString) {
      if (err) {
        callback(err, null);
      } else {
        var csvParser = new CsvParser(csvString);
        var data = csvParser.compute(computeOptions.cells, computeOptions.func);
        callback(null, data);
      }
    });
  };

  module.exports = CsvAnalyzer;
})();
