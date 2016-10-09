'use strict';

(function(){
  const pkg = require('../package.json');
  const commands = require('./commands').commands;
  const usage = [
    {
      header: pkg.name + ' v' + pkg.version,
      content: pkg.description
    },
    {
      header: 'Types',
      content: 'Usage: inuit --{type} {name}' + '\n' + 'This adds new lines to the main.scss file in your current directory.',
      optionList: commands.types
    },
    {
      header: 'Settings',
      content: 'Usage: inuit --{type} {name} [bold]{--{setting} {value}} [--{setting} {value} ...]' + '\n' + 'This will add new lines to the main.scss file with your settings.',
      optionList: commands.settings
    },
    {
      header: 'Utils',
      content: 'Usage: inuit [bold]{--{util}}' + '\n' + 'This will run related util. You can use this with types.',
      optionList: commands.utils
    }
  ];
  exports.usage = usage;
}).call(this);
