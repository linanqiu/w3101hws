(function () {
  'use strict';

  module.exports = {
    modules: {},
    module: function (name, dependencies) {
      if (dependencies) {
        return this.createModule(name, dependencies, this.modules);
      } else {
        return this.getModule(name, this.modules);
      }
    },
    createModule: function (name, dependencies, modules) {
      // prevent wrong name
      if (name === 'hasOwnProperty') {
        throw 'Module' + name + ' is not available';
      }

      // create new module instance
      var moduleInstance = {
        funcs: {},
        name: name,
        dependencies: dependencies,
        register: function (funcName, funcToRegister) {
          if (funcName === 'hasOwnProperty') {
            throw 'Module ' + name + ' is not available';
          }

          this.funcs[funcName] = funcToRegister;
        },
        inject: function (func) {
          var params = getParamNames(func);
          var args = [];

          var self = this;

          params.forEach(function (param) {
            var arg = self.funcs[param];
            args.push(arg);
          });

          return function () {
            return func.apply(func, args);
          };
        }
      };

      return moduleInstance;
    },
    getModule: function (name, modules) {
      if (modules.hasOwnProperty(name)) {
        return modules[name];
      } else {
        throw 'Module' + name + ' is not available';
      }
    }
  };

  // copied from stackoverflow
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var ARGUMENT_NAMES = /([^\s,]+)/g;

  function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) {
      result = [];
    }
    return result;
  }
})();
