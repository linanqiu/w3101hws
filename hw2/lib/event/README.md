## A Simple Event Constructor

I said in class that Node.js is an event-driven platform.  Actually, this can be said of browser environments as well, as the DOM uses events as its main interaction API for scripting.  Please make sure to [read up on the Observer and Publish/Subscribe patterns in Addy Osmani's book](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript).  Here we're going to build an Event constructor function implementing a simplified version the Publish/Subscribe pattern.

Your goal is to write an Event constructor function, which can be used to make event objects.

The event object returned from the constructor function has:

* `a subscribe()` method, which takes a function and stores it as a handler
* an `unsubscribe()` method, which takes a function and removes it from its handlers
* an `emit()` method, which takes an arbitrary number of arguments and calls all of the stored functions with these arguments.

Normally, event systems like this have to run a number of checks (ensuring that the arguments passed into subscribe are functions, for example).  They also typically have channels that can be subscribed to (so that clients of the system are able to subscribe and publish only to the events they are interested in).  They also have to make sure that handlers (the functions that subsrcribe to events) don't attempt to modify the event object, or that if they do, these modifications are handled properly.  For the purposes of this assignment, you don't have to worry about any of that, and you can assume that all subscribed functions are called with correct arguments.

Your Event module will be required in (see Event.spec.js) and used as follows:

```js
var Event = require('./Event'),
    event = new Event(),
    someFunction = function (a, b) { return a + b; };

event.subscribe(someFunction);
event.emit(1, 2); // someFunction will be called with these args
event.unsubscribe(someFunction); // some function no longer subscribed
```

Please see the spec file for more examples of how this works.
