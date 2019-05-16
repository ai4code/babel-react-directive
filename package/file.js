
var fs = require('fs')
var _path = require('path')
var translate = require('./translate');

function readFile(path) {
   var i;
   try{
        i = fs.readFileSync(path).toString()
   } catch(e) {console.error(e)}
   return i;
}

function whileFolder(dirName){
    dirName = _path.resolve(dirName) 
    if(!fs.existsSync(dirName)) throw new Error("目录不存在")
    fs.readdirSync(dirName).map(value => {
        var stats = fs.statSync(_path.join(dirName, value))
        let obj = {
            fileName: value
        }
        if(stats.isFile()){ //file
            if (checkJS(value)) { //js 编译
                console.log('translate running at ' + _path.join(dirName, value))
                var ipu = readFile(_path.join(dirName, value))
                var code = translate(ipu)
                wirteFile(_path.join(dirName, value), code) 
            } 
        }
        if(stats.isDirectory()){
           whileFolder(_path.join(dirName,value))
        } 
    }) 
}

function wirteFile (path, content) {
    console.log('rewirte file running at ' + path) 
    fs.writeFileSync(path, content ) 
    console.log('rewirte file success at ' + path)
}

function checkJS(path) {
    return  path.substr(path.length-3, path.length) === '.js'
}

module.exports = {
    readFile,
    whileFolder,
    wirteFile,
    checkJS
}