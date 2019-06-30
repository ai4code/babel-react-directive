#! node
var program = require('commander')
var version = require('../package.json').version 
var ora = require('ora')
var fs = require('fs')
var chalk = require('chalk') 
var $compile = require('../package/index') 

program
  .version(version)
  .option('-c --compile', 'babel react directive from html')  

  program
    .command('compile <path> <type>')
    .description('编译react指令')
    .action(function(path, type){ 
      spanner.start()
      $compile(path, type)
         process.exit(0)  
  });

program.parse(process.argv)