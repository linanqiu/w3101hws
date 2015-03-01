(function () {
  'use strict';

  // i realize this is probably not elegant code. sorry!
  module.exports = {
    modules: {},
    module: function (name, dependencies) {
      // differentiate between setting and getting
      if (dependencies) {
        return this.createModule(name, dependencies, this.modules);
      } else {
        return this.getModule(name, this.modules);
      }
    },
    createModule: function (name, dependencies, modules) {
      // prevent illegal name
      if (name === 'hasOwnProperty') {
        throw 'Module ' + name + ' is not available';
      }

      // maintain a reference to modules
      var allModules = this.modules;

      // create new module instance
      var moduleInstance = {
        funcs: {},
        name: name,
        dependencies: dependencies,
        register: function (funcName, funcToRegister) {
          // prevent illegal name
          if (funcName === 'hasOwnProperty') {
            throw 'Module ' + name + ' is not available';
          }
          // register function
          this.funcs[funcName] = funcToRegister;
        },
        inject: function (func) {
          // gets param names
          var params = getParamNames(func);

          // maintain a reference to this moduleInstance
          var self = this;

          return function () {

            // map each param in params to a function that will be found recursively
            var args = params.map(function (param) {

              // function to recursively search for functions
              function searchParam(param, thisModule, rootModule, meetCount) {

                // stops on cycles. 
                if (thisModule.name === rootModule.name) {
                  if (meetCount > 0) {
                    return undefined;
                  }
                  meetCount++;
                }

                // search children if not found
                if (thisModule.getRegisteredFunc(param)) {
                  var foundParam = thisModule.getRegisteredFunc(param);
                  return foundParam;
                } else {
                  for (var i = 0; i < thisModule.dependencies.length; i++) {
                    var childModule = allModules[thisModule.dependencies[i]];
                    return searchParam(param, childModule, rootModule);
                  }
                }
              }

              // initiate search for functions
              var foundParam = searchParam(param, self, self, 0);

              // returns the found function to the map function
              return foundParam;
            });

            // applies function with args
            return func.apply(null, args);
          };
        },
        getRegisteredFunc: function (param) {
          return this.funcs[param];
        }
      };

      // add newly created module to modules
      this.modules[name] = moduleInstance;
      return moduleInstance;
    },
    getModule: function (name, modules) {
      // searches for module
      if (modules.hasOwnProperty(name)) {
        return modules[name];
      } else {
        throw 'Module ' + name + ' is not available';
      }
    }
  };

  // copied from stackoverflow
  // http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
  function getParamNames(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;

    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) {
      result = [];
    }
    return result;
  }
})();
