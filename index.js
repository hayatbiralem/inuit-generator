#! /usr/bin/env node

// Dependencies.
const commandLineArgs = require('command-line-args');
const fs      = require('fs');
const chalk   = require('chalk');
const log     = function(){ console.log.apply(console, arguments); };
const success = function(){ console.log(chalk.green.apply(chalk, arguments)) };
const error   = function(){ console.log(chalk.red.apply(chalk, arguments)) };

// Option definitions.
const optionDefinitions = [
  // types
  { name: 'settings',   alias: 's', type: String, multiple: true },
  { name: 'tools',      alias: 't', type: String, multiple: true },
  { name: 'generic',    alias: 'g', type: String, multiple: true },
  { name: 'elements',   alias: 'e', type: String, multiple: true },
  { name: 'objects',    alias: 'o', type: String, multiple: true },
  { name: 'components', alias: 'c', type: String, multiple: true },
  { name: 'utilities',  alias: 'u', type: String, multiple: true },
  // paths
  { name: 'dir',        alias: 'd', type: String, defaultValue: './' },
  { name: 'main',       alias: 'm', type: String, defaultValue: 'main.scss' }
];

// Get options.
const options = commandLineArgs(optionDefinitions);
// console.log(options);

// Vars.
var types = 'settings tools generic elements objects components utilities'.split(' ');
var mainPath = options.dir + options.main;
var symbols = {
  indent: '  ',
  hugeIndent: '  ',
  ok: '✓',
  err: '✖',
  info: 'ℹ'
};

// Read main file.
fs.readFile(mainPath, 'utf8', function (err, data) {

  // Check error.
  if (err) throw err;
  // console.log(data);

  // Temp.
  var temp = data;

  // Loop.
  types.forEach(function(type){

    // Check 'type' is exists.
    if(!options[type]) return;
    log(type);

    // Vars.
    var names = options[type];
    var pattern = new RegExp('@import "'+type+'\/'+type+'\.(.*?)";', 'g');
    var idx = 0;
    var len = data.match(pattern).length;
    data = data.replace(pattern, function(match, p1, p2, string){
      idx++;

      if(len === idx) {
        var newLines = [];
        names.forEach(function(name){
          var newLine = '@import "'+type+'/'+type+'.'+name+'";';
          if(string.indexOf(newLine) !== -1){
            error(symbols.indent + symbols.err + ' ' + chalk.bold(name) + ' already exists!');
          } else {
            newLines.push(newLine);
            success(symbols.indent + symbols.ok + ' ' + chalk.bold(name) + ' added!');
          }
        });

        return newLines.length > 0 ? match + "\n" + newLines.join("\n") : match;
      }

      return match;
    });
  });

  log('updating');
  if(temp !== data) {
    fs.writeFile (mainPath, data, function(err) {
      if (err) throw err;
      success(symbols.indent + symbols.ok + ' Changes saved!');
    });
  } else {
    error(symbols.indent + symbols.err + ' No change!');
  }

});