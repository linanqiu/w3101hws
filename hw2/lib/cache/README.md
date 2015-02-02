## Creating a function cache

We've already seen a lot of functions that take in other functions.  We've also seen a lot of functions that return other functions.  Here we're going to put that functional mind-set to use to cache the results of calls to arbitrary functions (we often want to do this when we're calculating complex things (that end up making multiple function calls with the same arguments, or when making API calls where we want to return the result right away).  Your job is to create a function wrapper called `cache` which takes a function and returns a new function that caches the results of calling the function on a given set of arguments and will return the cached results when the function is called again with those same arguments.

For example:

```js
var someComplexFunction = function(arg1, arg2) {
  /* complex calculation in here */
};
var cachedFunction = cache(someComplexFunction);

cachedFunction('a', 'b'); // complex function should be executed
cachedFunction('a', 'b'); // complex function should not be invoked
                          // again, instead the cached result
                          // should be returned

cachedFunction('a', 'c'); // should be executed, because the method
                          // wasn't invoked before with these
                          // arguments
```

HINT: You may find the `JSON.stringify()` method useful ;)
