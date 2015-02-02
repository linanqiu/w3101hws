## CsvAnalyzer

It's time to start working with multiple files, building up functionality piece by piece.

The CsvAnalyzer will consist of 3 files:

1. CsvParser.js - this file will consist of a constructor function that takes in a string of csv (comma separated values) as input and will return an object with a `csv` property as an array of arrays representing each row of the csv and a `compute()` method that will take an array of 2 cells as its first argument and a function as its second argument.  Each cell will be a POJO (plain old JavaScript object) with a row property and a col property, and the function will be a binary function that we want to call on the values of these 2 cells.  The `compute()` method will return the result of calling that function on the 2 cells specified:

```js

var CsvParser = require('./CsvParser');

// later

var input = '"some","set","of","comma separated values"\n"using"' +
            ',"newline","as","row delimiter"';
var csv = new CsvParser(input);
console.log(csv.csv); // the array of arrays of each row
var cells = [
  {row: 0, col: 1},
  {row: 1, col: 0}
];
console.log(csv.compute(cells, concat));

function concat (a, b) { return a + b; }
```

2. FileFinder.js - this module takes the path to a directory and an extension (without a dot, i.e. 'txt'), finds the first file with that extension in the given directory, reads that file in, and returns the string representing that file's content as the second argument to the callback that is passed into it. For example, if we want to put the content of a the first 'txt' file from a given folder into a textstring variable, here's how we would go about it:

```js
var FileFinder = require('./FileFinder'),
    textstring = '';

FileFinder(pathToDirectory, 'txt', function (err, data) {
  // if we are the last link in the chain it is sufficient to call:
  if (err) { return console.error(err); }
  // if not we need to pass the error along to the callback, as in:
  // if (err) { return callback(err); }

  textstring = data;
});
```

3. index.js - this module allows us to put together the 2 modules above, enabling us to compute the result of calling a particular function on a particular set of 2 cells in the csv table by passing in the directory to be searched for the csv file, an options object contain the cells whose values we want to compute and the function we want to compute it on, and finally a callback function that takes an `err` argument and a `data` argument and that on success will return the results of that computation.

In order to complete this lesson, you will have to create your own module.export functions and you will have to become familiar with asynchronous callbacks in node.  You can do this either by working your way through the nodeschool tutorial at http://nodeschool.io/#workshoppers (you can also simply `$ npm install -g learnyounode` and run `$ learnyounode` in a separate directory to get started with the tutorial directly) or by reading [chapter 6 of Node.js, MongoDB, and AngularJS Web Development which you should be able to access for free with your Columbia account through Safari (perhaps via the library website)](https://www.safaribooksonline.com/library/view/nodejs-mongodb-and/9780133844351/). I recommend the nodeschool tutorial.  The only 2 modules that you will need to require in besides your own are the fs module and the path module from the Node core library.  The path module is not strictly necessary but may prove a useful convenience.

You do need to make sure that you use the asynchronous `readFile()` method in the fs module and not the synchronous one, as index.js passes in a callback that it expects will be called asynchronously.
