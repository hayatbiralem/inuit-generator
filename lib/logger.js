(function() {
  const chalk = require('chalk');
  const isTest = function(){
    return process.env.NODE_ENV === 'test';
  };
  const log = function(){
    if(!isTest()) console.log.apply(console, arguments);
  };
  const success = function(){
    if(!isTest()) console.log(chalk.green.apply(chalk, arguments));
  };
  const error = function(){
    if(!isTest()) console.log(chalk.red.apply(chalk, arguments));
  };
  const info = function(){
    if(!isTest()) console.log(chalk.blue.apply(chalk, arguments));
  };

  exports.log = log;
  exports.success = success;
  exports.error = error;
  exports.info = info;
}).call(this);
