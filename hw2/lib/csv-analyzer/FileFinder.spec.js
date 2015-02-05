(function () {
  'use strict';

  var FileFinder = require('./FileFinder'),
      CsvParser = require('./CsvParser'),
      expect    = require('chai').expect;

  describe('FileFinder', function() {

    var csvfile;

    beforeEach(function (done) {
      FileFinder(process.cwd() + '/lib/csv-analyzer/', 'csv', function (err, data) {
        if (err) {
          console.error(err);
          return done();
        }
        csvfile = data;
        done();
      });
    });

    it('should find a csv file and return it as a string', function(done) {
      FileFinder(process.cwd() + '/lib/csv-analyzer/', 'csv', function (err, data) {
        if (err) { return console.error(err); }
        expect(data).to.equal('1,2\n3,4\n5,6\n');
        done();
      });
    });

    describe('Given a bad directory', function() {
      it('should call the callback with an error message', function(done) {
        FileFinder('asdflkasfd', 'csv', function (err, data) {
          expect(err.toString()).to.contain('ENOENT');
          done();
        });
      });
    });

    describe('Given an extension with no files in the dir', function() {

      it('should call the callback with an error message', function(done) {
        FileFinder(process.cwd() + '/lib/csv-analyzer/', 'html', function (err, data) {
          expect(err.toString()).to.contain('Unable to find html file');
          done();
        });
      });
    });


  });
})();
