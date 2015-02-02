(function () {
  'use strict';

  var CsvParser = require('./CsvParser'),
      expect = require('chai').expect;

  var csvfile = '1,2\n3,4\n5,6';
  var csvnewline = '1,2\n3,4\n5,6\n';
  var csv2 = '1,2,3\n4,5,6';
  var csv3 = 'a,b,c,d,e\n1,2,3,4,5\nf,g,h,i,j';
  var csv4 = '1\n2\n3\n4\n5';
  var csv5 = '1\n2\n3\n4\n5';
  var csv6 = '1,2,3,4,5,6,7,8,9';
  describe('CsvParser', function() {

    describe('Given csv as input', function() {
      it('should map the csv file into a 2D array', function() {
        var csv = new CsvParser(csvfile);
        expect(csv.csv).to.eql([['1', '2'], ['3', '4'], ['5', '6']]);
      });

      it('should handle csv input with a trailing newline', function() {
        var csv = new CsvParser(csvnewline);
        expect(csv.csv).to.eql([['1', '2'], ['3', '4'], ['5', '6']]);
      });

      describe('Given two cells and a binary function to compute', function() {
        it('should compute the value of applying that function to those cells',
            function() {
          var csv = new CsvParser(csvfile);
          var a = {row: 1, col: 1},
              b = {row: 2, col: 0};
          expect(csv.compute([a, b], add)).to.equal(9);

          function add(a, b) {
            return parseFloat(a) + parseFloat(b);
          }
        });
      });
    });
  });
})();
