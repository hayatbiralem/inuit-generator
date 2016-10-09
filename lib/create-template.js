'use strict';

(function(){
  const fs = require('fs');
  const Twig = require('twig');
  const createTemplate = function(type, name){
    var defaultTemplateFile = __dirname + '/../twig/default.twig';
    var typeTemplateFile = __dirname + '/../twig/' + type + '.twig';
    var newFilePath = type + '/' + type + '.' + name + '.scss';
    var writeTemplate = function(file){
      fs.stat(newFilePath, function(err, stats){
        if(err) {
          Twig.renderFile(
            file,
            {
              title: name.toUpperCase(),
              name: name
            },
            function(err, html) {
              // Check error.
              if (err) throw err;

              if (!fs.existsSync(type)){
                fs.mkdirSync(type);
              }

              fs.writeFile(newFilePath, html, function(err) {
                if (err) throw err;
              });
            }
          );
        }
      });
    };

    fs.stat(typeTemplateFile, function(err, stats){
      if(!err) {
        writeTemplate(typeTemplateFile);
      } else {
        writeTemplate(defaultTemplateFile);
      }
    });
  };
  module.exports = createTemplate;
}).call(this);