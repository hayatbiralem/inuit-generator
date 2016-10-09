'use strict';

// test dependencies
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(chaiAsPromised);
var expect = require('chai').expect;

// cli
var cli = require('../lib/cli');

// for clear
var del = require("del");

// test environment
process.env.NODE_ENV = 'test';

// types
describe('types', function () {

  // settings
  describe('settings', function(){

    it('`inuit --settings config` should be rejected.', function () {
      var argv = ['--settings', 'config'];
      var result = cli.run(argv);
      return result.should.be.rejected;
    });

    it('main.scss file should be created.', function () {
      var argv = ['--init'];
      var result = cli.run(argv);
      return expect(result).to.eventually.equal('main.scss file created.');
    });

    it('`inuit --settings config` should be print `{main} file written.`', function () {
      var argv = ['--settings', 'config'];
      var args = cli.getArgs(argv);
      var result = cli.run(argv);
      return result.should.eventually.deep.equal(args.main + ' file written.');
    });

    it('`inuit -s config` should be print `No change.`', function () {
      var argv = ['-s', 'config'];
      var result = cli.run(argv);
      return result.should.eventually.deep.equal('No change.');
    });

    it('`inuit --settings colors` should be print `{main} file written.`', function () {
      var argv = ['--settings', 'colors'];
      var args = cli.getArgs(argv);
      var result = cli.run(argv);
      return result.should.eventually.deep.equal(args.main + ' file written.');
    });

    it('`inuit -s colors` should be print `No change.`', function () {
      var argv = ['-s', 'colors'];
      var args = cli.getArgs(argv);
      var result = cli.run(argv);
      return result.should.eventually.deep.equal('No change.');
    });

    it('settings folder should be deleted.', function () {
      var args = cli.getArgs([]);
      var result = del([args.base + '/settings']);
      return result.should.be.fulfilled;
    });

  });

  // utilities
  describe('utilities', function(){

    it('`inuit --utilities clearfix`  should be print `No change.`', function () {
      var argv = ['--utilities', 'clearfix'];
      var result = cli.run(argv);
      return result.should.eventually.deep.equal('No change.');
    });

    it('`inuit -u clearfix` should be print `No change.`', function () {
      var argv = ['-u', 'clearfix'];
      var result = cli.run(argv);
      return result.should.eventually.deep.equal('No change.');
    });

    it('`inuit --utilities text-underline` should be print `{main} file written.`', function () {
      var argv = ['--utilities', 'text-underline'];
      var args = cli.getArgs(argv);
      var result = cli.run(argv);
      return result.should.eventually.deep.equal(args.main + ' file written.');
    });

    it('`inuit -u text-underline` should be print `{main} file written.`', function () {
      var argv = ['-u', 'text-underline'];
      var result = cli.run(argv);
      return result.should.eventually.deep.equal('No change.');
    });

    it('utilities folder should be deleted.', function () {
      var args = cli.getArgs([]);
      var result = del([args.base + '/utilities']);
      return result.should.be.fulfilled;
    });

  });

});

// utils
describe('utils', function () {

  it('`inuit --help` should print usage guide', function () {
    var argv = ['--help'];
    var result = cli.run(argv);
    return expect(result).to.eventually.equal('Usage guide printed.');
  });

  it('`inuit -h` should print usage guide', function () {
    var argv = ['-h'];
    var result = cli.run(argv);
    return expect(result).to.eventually.equal('Usage guide printed.');
  });

  it('`inuit --init` should create a fresh main.scss file', function () {
    var argv = ['--init'];
    var result = cli.run(argv);
    return expect(result).to.eventually.equal('main.scss file created.');
  });

  it('`inuit -i` should create a fresh main.scss file', function () {
    var argv = ['-i'];
    var result = cli.run(argv);
    return expect(result).to.eventually.equal('main.scss file created.');
  });

  it('main.scss file should be deleted.', function () {
    var args = cli.getArgs([]);
    var result = del([args.paths.main]);
    return result.should.be.fulfilled;
  });

});
