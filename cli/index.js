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
      console.log(path, type, '>>>>>>>>>>>>>>')  
      let spanner = ora("   正在编译，請稍等......")
      spanner.start()
      $compile(path, type) 
         console.log(chalk.green('★'),chalk.green('项目编译成功'))
         spanner.stop()
         process.exit(0)  
  });

program.parse(process.argv)