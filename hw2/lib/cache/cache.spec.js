(function () {
  'use strict';

  var cache  = require('./cache'),
      expect = require('chai').expect;

  describe('intial tests', function() {
    // 'Please define your cache function');
    expect(typeof cache).to.equal('function');
  });

  describe('functionality tests', function() {
    var complexFunctionCalls = 0;
    var complexFunction = function(arg1) {
      complexFunctionCalls++;
      return arg1.split('').reverse().join('');
    };
    var voidFunction = function() {
      complexFunctionCalls++;
    };

    var cached = cache(complexFunction);

    it('should wrap the complex function', function() {
      // 'Your cache function must return a function');
      expect(typeof cached).to.equal('function');
    });

    it('should return correct results', function() {
      // 'The cache function returned incorrect result');
      expect(cached('foo')).to.equal('oof');
      // 'The inner function wasn\'t called');
      expect(complexFunctionCalls).to.equal(1);
      // 'The cache function returned incorrect result');
      expect(cached('foo')).to.equal('oof');
      // 'The inner function was called multiple times');
      expect(complexFunctionCalls).to.equal(1);
    });

    it('should return correct results for different argument', function() {
      // 'The cache function returned incorrect result');
      expect(cached('bar')).to.equal('rab');
      // 'The inner function wasn\'t called');
      expect(complexFunctionCalls).to.equal(2);
      // 'The cache function returned incorrect result');
      expect(cached('bar')).to.equal('rab');
      // 'The inner function was called multiple times');
      expect(complexFunctionCalls).to.equal(2);
    });

    it('should not call inner function again for known arguments', function() {
      // 'The cache function returned incorrect result');
      expect(cached('foo')).to.equal('oof');
      // 'The inner function was called multiple times');
      expect(complexFunctionCalls).to.equal(2);
    });

    it('should return correct result for void function call', function() {
      complexFunctionCalls = 0;
      cached = cache(voidFunction);

      // 'A void function must still return undefined');
      expect(cached()).to.equal(undefined);
      // 'The inner function wasn\'t called');
      expect(complexFunctionCalls).to.equal(1);
      // 'A void function must still return undefined');
      expect(cached()).to.equal(undefined);
      // 'The inner function was called multiple times');
      expect(complexFunctionCalls).to.equal(1);
    });

    it('should return different results for different inner functions',
       function() {
      var cachedSquare = cache(function(n) { return n * n; });
      var cachedCube = cache(function(n) { return n * n * n; });
      // 'Cached function did not return the correct result');
      expect(cachedSquare(5)).to.equal(25);
      // 'Cached function did not return the correct result');
      expect(cachedCube(5)).to.equal(125);
    });

    it('should return correct result even for objects as arguments', function() {
      complexFunctionCalls = 0;

      var getAllKeys = cache(function(obj1, obj2) {
        complexFunctionCalls++;
        return Object.keys(obj1).concat(Object.keys(obj2));
      });

      var obj1 = {foo: 'foo', bar: 'bar'};
      var obj2 = {baz: 'baz'};

      // 'Cached function did not return the correct result');
      expect(getAllKeys(obj1, obj2)).to.eql(['foo', 'bar', 'baz']);
      // 'The inner function wasn\'t called');
      expect(complexFunctionCalls).to.equal(1);
      // 'Cached function did not return the correct result');
      expect(getAllKeys(obj2, obj1)).to.eql(['baz', 'foo', 'bar']);
      // 'The inner function wasn\'t called');
      expect(complexFunctionCalls).to.equal(2);
      // 'Cached function did not return the correct result');
      expect(getAllKeys(obj1, obj2)).to.eql(['foo', 'bar', 'baz']);
      // 'The inner function was called multiple times');
      expect(complexFunctionCalls).to.equal(2);
    });
  });

})();
