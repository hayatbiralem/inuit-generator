(function() {

  // read package
  const pkg = require("../package.json");

  // logs
  const logger = require('./logger');

  //
  // const createTemplate = require('./create-template');

  // help
  const help = function(args) {
    try {
      var getUsage = require('command-line-usage');
      var usage = require('./usage').usage;
      logger.log(getUsage(usage));
      args.resolve('Usage guide printed.');
    } catch(err) {
      args.reject(err);
    }
  };

  // init
  const init = function(args) {
    try {
      var copy = require('./copy');
      copy(args.paths.example, args.paths.main, function(err){
        if(err) args.reject(err);
        else args.resolve(args.main + ' file created.');
      });
    } catch(err) {
      args.reject(err);
    }
  };

  // getArgs
  const getArgs = function(argv) {
    var commandLineArgs = require('command-line-args');
    var commands = require('./commands');
    var args = commandLineArgs(commands.all(), argv || process.argv);
    args.paths = {
      example: __dirname + '/../scss/example.main.scss',
      main: args.base + args.main
    };
    args.types = [];
    commands.commands.types.forEach(function(type){
      args.types.push(type.name);
    });
    args.symbols = {
      indent: '  ',
      hugeIndent: '  ',
      ok: '✓',
      error: '✖',
      info: 'ℹ'
    };
    return args;
  };

  // run
  const run = function(argv) {
    return new Promise(function(resolve, reject){
      const walk = require('./walk');
      var args = getArgs(argv);
      args.resolve = resolve;
      args.reject = reject;

      if (args.help === true || (!argv && process.argv.length === 2)) {
        help(args);
      } else if(args.init === true){
        init(args);
      } else {
        walk(args);
      }
    });
  };

  // exports
  exports.help = help;
  exports.init = init;
  exports.run = run;
  exports.getArgs = getArgs;
  exports.logger = logger;

}).call(this);