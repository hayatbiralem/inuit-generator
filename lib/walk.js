'use strict';

(function(){
  'use strict';

  const fs = require('fs');
  const capitalizeFirstLetter = require('./capitalize-first-letter');
  const chalk = require('chalk');
  const logger = require('./logger');
  var symbols = {
    indent: '  ',
    hugeIndent: '  ',
    ok: '✓',
    error: '✖',
    info: 'ℹ'
  };

  const walk = function(args){
    // Read main file.
    fs.readFile(args.paths.main, 'utf8', function (err, data) {

      // Check error.
      if (err) {
        logger.error('Apparently you not have your main.scss file. If you run `inuit -i` we can create a fresh one for you.');
        args.reject(err);
        return;
      }

      // Aditions.
      var aditions = {};
      args.types.forEach(function(type){
        aditions[type] = [];
      });

      // Changed.
      var isChanged = false;

      // Template.
      var createTemplate = require('./create-template');

      // Loop.
      args.types.forEach(function(type){

        // Check 'type' is exists.
        if(!args[type]) return;
        logger.log('');
        logger.log(type);

        // Vars.
        var names = args[type];
        var modulePattern = new RegExp('@import "'+type+'\/.*?\.([^\.]*?)";', 'g');
        var idx = 0;
        var len = data.match(modulePattern).length;
        data = data.replace(modulePattern, function(match, p1, offset, string){
          idx++;

          if(len === idx) {
            var newLines = [];
            names.forEach(function(name){
              var newLine = '@import "'+type+'/'+type+'.'+name+'";';
              if(string.indexOf(newLine) !== -1){
                logger.error(symbols.indent + symbols.error + ' ' + chalk.bold(name) + ' already exists!');
              } else {
                newLines.push(newLine);
                aditions[type].push(name);
                logger.success(symbols.indent + symbols.ok + ' ' + chalk.bold(name) + ' added!');
                if(!isChanged) isChanged = true;

                createTemplate(type, name, args.desc);
              }
            });

            return newLines.length > 0 ? match + "\n" + newLines.join("\n") : match;
          }

          return match;
        });
      });

      // Comments.
      if(isChanged || true) {
        var commentPattern = /\/\*{2}([\s\S]+?)\*\//g;
        data = data.replace(commentPattern, function(match, p1, offset, string){
          if(match.indexOf('CONTENTS') !== -1){
            var lines = match.split('\n');
            var names;
            var groups = [];
            var lastGroupIndex = -1;
            var groupPattern = new RegExp('\\\* (' + args.types.join('|') + ')');
            var pads = '.....................';
            lines.forEach(function(line){
              var match = line.trim().toLowerCase().match(groupPattern);
              if(match) {
                var currentType = match[1];
                names = aditions[currentType];

                lastGroupIndex++;
                groups[lastGroupIndex] = {
                  "old": [],
                  "new": []
                };

                groups[lastGroupIndex].old.push(' * ' + currentType.toUpperCase());
                if(names && names.length > 0) {
                  names.forEach(function(name){
                    groups[lastGroupIndex].new.push(' * ' + capitalizeFirstLetter(name) + pads.substr(name.length) + args.desc);
                  });
                }
              } else {
                if(groups[lastGroupIndex] && line.trim() != '*/' && line.trim() != '*') {
                  groups[lastGroupIndex].old.push(line);
                }
              }
            });

            var contents = [];
            contents.push('/**\n * CONTENTS');
            groups.forEach(function(group){
              contents.push(' *');
              group.old.forEach(function(line){ contents.push(line); });
              group.new.forEach(function(line){ contents.push(line); });
            });
            contents.push(' */');

            return contents.join('\n');
          }

          return match;
        });
      }

      // Main.
      if(isChanged) {
        fs.writeFile (args.paths.main, data, function(err) {
          if (err) {
            logger.error(args.main + ' file could not be written.');
            args.reject(err);
          } else {
            logger.log('');
            logger.success(args.main + ' file written.');
            args.resolve(args.main + ' file written.');
          }
        });
      } else {
        logger.log('');
        logger.info('No change.');
        args.resolve('No change.');
      }
    });
  };
  module.exports = walk;
}).call(this);
