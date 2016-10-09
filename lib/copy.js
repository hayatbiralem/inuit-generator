'use strict';

(function(){
  const fs = require('fs');
  const copy = function(from, to, callback){
    callback = callback || function(){};
    var cleanup = function(){
      dest.removeListener('finish', finish);
      dest.removeListener('error', error);
      src.removeListener('error', error);
    };
    var finish = function(){
      cleanup();
      callback(null);
    };
    var error = function(err){
      cleanup();
      callback(err);
    };

    var src = fs.createReadStream(from);
    var dest = fs.createWriteStream(to);

    dest.addListener('finish', finish);
    dest.addListener('error', error);
    src.addListener('error', error);

    src.pipe(dest);
  };
  module.exports = copy;
}).call(this);