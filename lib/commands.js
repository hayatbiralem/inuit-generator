'use strict';

(function(){
  var commands = {
    types: [
      { name: 'settings',   alias: 's', type: String, multiple: true, description: 'Add new settings file(s).' },
      { name: 'tools',      alias: 't', type: String, multiple: true, description: 'Add new tools file(s).' },
      { name: 'generic',    alias: 'g', type: String, multiple: true, description: 'Add new generic file(s).' },
      { name: 'elements',   alias: 'e', type: String, multiple: true, description: 'Add new elements file(s).' },
      { name: 'objects',    alias: 'o', type: String, multiple: true, description: 'Add new objects file(s).' },
      { name: 'components', alias: 'c', type: String, multiple: true, description: 'Add new components file(s).' },
      { name: 'utilities',  alias: 'u', type: String, multiple: true, description: 'Add new utilities file.' }
    ],
    settings: [
      { name: 'base',       alias: 'b', type: String, defaultValue: './',                  description: 'Change base directory.' },
      { name: 'main',       alias: 'm', type: String, defaultValue: 'main.scss',           description: 'Change default main file name.' },
      { name: 'desc',       alias: 'd', type: String, defaultValue: 'No description yet.', description: 'Change default description message.' }
    ],
    utils: [
      { name: 'init',      alias: 'i', type: Boolean, description: 'Create a fresh example main.scss file. Be careful when using it.' },
      { name: 'help',      alias: 'h', type: Boolean, description: 'Print this usage guide.' }
    ]
  };

  var all = function(){
    var result = [];
    for(var key in commands){
      result = result.concat(commands[key]);
    }
    return result;
  };

  exports.commands = commands;
  exports.all = all;
}).call(this);