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
        throw 'Module ' + name + ' is not available';
      }

      var globalObject = this.modules;

      // create new module instance
      var moduleInstance = {
        funcs: {},
        name: name,
        dependencies: [],
        register: function (funcName, funcToRegister) {
          if (funcName === 'hasOwnProperty') {
            throw 'Module ' + name + ' is not available';
          }

          this.funcs[funcName] = funcToRegister;
        },
        inject: function (func) {
          var params = getParamNames(func);
          var self = this;

          return function () {

            var args = params.map(function (param) {

              function searchParam(param, thisModule) {
                if (thisModule.getRegisteredFunc(param)) {
                  return thisModule.getRegisteredFunc(param);
                } else {
                  for (var i = 0; i < thisModule.dependencies.length; i++) {
                    var childModule = globalObject[thisModule.dependencies[i]];
                    return searchParam(param, childModule);
                  }
                }
              }
              return searchParam(param, self);
            });

            return func.apply(null, args);
          };
        },
        getRegisteredFunc: function (param) {
          return this.funcs[param];
        }
      };

      // circular dependency check
      function isCircular(rootModule, currentModule) {
        if (currentModule.name === rootModule.name) {
          console.log('checked');
          return true;
        } else {
          var dependencies = currentModule.dependencies;
          for (var i = 0; i < dependencies.length; i++) {
            console.log(dependencies[i]);
            console.log(rootModule.name);
            var dependencyModule = globalObject[dependencies[i]];
            return isCircular(rootModule, dependencyModule);
          }
        }
        return false;
      }

      dependencies.forEach(function (dependency) {
        var dependencyModule = globalObject[dependency];
        if (!isCircular(moduleInstance, dependencyModule)) {
          moduleInstance.dependencies.push(dependency);
        }
      });

      console.log(globalObject);

      this.modules[name] = moduleInstance;

      return moduleInstance;
    },
    getModule: function (name, modules) {
      if (modules.hasOwnProperty(name)) {
        return modules[name];
      } else {
        throw 'Module ' + name + ' is not available';
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
