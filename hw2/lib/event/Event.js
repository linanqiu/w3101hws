(function () {
  'use strict';

  // event constructor
  var Event = function () {
    Object.defineProperty(this, 'subscribers', {
      value: [],
      writable: false
    });
  };

  // subscribes by adding to array
  Event.prototype.subscribe = function (someFunc) {
    this.subscribers.push(someFunc);
  };

  // unsubs by removing from array
  Event.prototype.unsubscribe = function (someFunc) {
    var index = this.subscribers.indexOf(someFunc);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  };

  // emits
  Event.prototype.emit = function () {
    var args = Array.prototype.slice.call(arguments);

    this.subscribers.forEach(function (subscriber) {
      subscriber.apply(this, args);
    });
  };

  module.exports = Event;
})();
