## HW2: JavaScript Functions and Intro to Node

### DUE DATE: Fri, Feb 6 at 11:59 PM

There are 3 directories inside of the **lib/** folder.  Each of these directories contains an exercise.  The README.md file inside of each explains exactly what is expected of you, the test file (the one that ends with .spec.js) is set up to verify that the file is working (or not working) as expected, and the file itself contains a function in the form:

```js
module.exports = function ([param,], param,[..., param]]]) {
  // Your code goes here
};
```

You should not change anything except what is inside that function.

There are several steps to completing this homework:

1. You should already have gulp installed globally.  If you do not, run `$ npm install -g gulp` - This will install gulp globally (note that you must have npm installed already for this to work).
2. `$ npm install` - run this command from inside the hw1 directory.  This will install all of the packages necessary for running the automated test suite (so that you can check your work as you go). Install hw1's package dependencies (you must be inside of the hw1/ directory).
8. `$ gulp` - this will run the all of the tests for this homework assignment.  As I said, I don't want you to worry about the internals of testing right now.  I just want you to start to feel comfortable with it and to use it as a tool to make sure that you're getting everything right in the assignment.  If you want to run only one set of tests, change the set `describe` to `describe.only` on the test file that you want to run.
9. Once you have completed the assignment, commit your changes.  Make sure to commit by 11:59 PM on Friday, Feb 6.
