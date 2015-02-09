(function () {
  'use strict';

  // constructs csvparser object
  var CsvParser = function (csvString) {
    var csv = [];

    Object.defineProperty(this, 'csv', {
      get: function () {
        return csv;
      }
    });

    var rowsString = csvString.trim().split('\n');
    rowsString.forEach(function (rowString) {
      if (rowString.length > 0) {
        var row = rowString.split(',');
        csv.push(row);
      }
    });
  };

  // compute function
  CsvParser.prototype.compute = function (cells, binaryFunction) {
    var cellA = this.csv[cells[0].row][cells[0].col];
    var cellB = this.csv[cells[1].row][cells[1].col];
    return binaryFunction(cellA, cellB);
  };

  module.exports = CsvParser;
})();
