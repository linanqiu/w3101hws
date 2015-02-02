(function () {
  'use strict';

  var Event = require('./Event'),
      expect = require('chai').expect;

  function Stub() {
    return function _stub() {
      _stub.args = Array.prototype.slice.call(arguments);
      _stub.calls = (_stub.calls || 0) + 1;
    };
  }

  describe('Simple Event test cases', function() {
    it ('an Event constructor function should be defined', function () {
      expect(typeof Event).to.equal('function');
    });

    var e = new Event(),
      f1 = new Stub(),
      f2 = new Stub(),
      f3 = new Stub();

    it('an event object object should have ' +
       '.subscribe, .unsubscribe and .emit methods', function () {
      expect(typeof e.subscribe).to.equal('function');
      expect(typeof e.unsubscribe).to.equal('function');
      expect(typeof e.emit).to.equal('function');
    });

    it('an event object should emit values to subscribed handlers', function () {
      e.subscribe(f1);
      e.subscribe(f2);

      e.emit(1, 2, 3, 'first', undefined, false);

      expect(f1.calls).to.equal(1); // 'first handler calls'
      expect(f2.calls).to.equal(1); // 'second handler calls'
      expect(f1.args).to.eql([1, 2, 3, 'first', undefined, false]); // 'first handler arguments'
      expect(f2.args).to.eql([1, 2, 3, 'first', undefined, false]); // 'second handler arguments'
    });

    it('an event object should not emit values to unsubscribed handlers', function () {
      e.subscribe(f3);
      e.unsubscribe(f2);

      e.emit(2, 'second', true);
      expect(f1.calls).to.equal(2); // 'previously subscribed handler calls'
      expect(f2.calls).to.equal(1); // 'unsubscribed handler calls'
      expect(f3.calls).to.equal(1); // 'newly subscribed handler calls'

      e.subscribe(f2);
      e.emit(3, 'third');

      expect(f2.calls).to.equal(2); // 'unsubscribed handler calls after re-subscription and emit'
    });

  });

})();
