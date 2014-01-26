'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StaticGenerator = module.exports = function StaticGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function () {
        this.spawnCommand('grunt', ['server']);
      }.bind(this)
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StaticGenerator, yeoman.generators.Base);

StaticGenerator.prototype.askFor = function askFor() {
  // var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  // var prompts = [{
  //   type: 'confirm',
  //   name: 'someOption',
  //   message: 'Would you like to enable this option?',
  //   default: true
  // }];

  // this.prompt(prompts, function (props) {
  //   this.someOption = props.someOption;

  //   cb();
  // }.bind(this));
};

StaticGenerator.prototype.app = function app() {
  this.copy('_package.json', 'package.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');


  this.directory('src', 'src');
};

// StaticGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
// };
