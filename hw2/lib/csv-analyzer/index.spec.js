(function () {
  'use strict';

  var CsvAnalyzer = require('../csv-analyzer/'),
      expect      = require('chai').expect;

  describe('CsvAnalyzer', function() {

    var dir = process.cwd() + '/lib/csv-analyzer/',
        a = {row: 1, col: 1},
        b = {row: 2, col: 0},
        cells = [a, b],
        computeOptions = {
          cells: cells,
          func: add
        };

    function add(a, b) { return parseFloat(a) + parseFloat(b); }

    it('should find a csv file and compute the function', function(done) {
      CsvAnalyzer(dir, computeOptions, function(err, data) {
        if (err) { return console.error(err); }
        expect(data).to.equal(9);
        done();
      });
    });

    it('should throw when given a bad dir', function(done) {
      CsvAnalyzer('asdflkasfd', computeOptions, function (err, data) {
        expect(err.toString()).to.contain('ENOENT');
        done();
      });
    });

  });
})();
