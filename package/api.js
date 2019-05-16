var translate = require('./translate') 
var $file = require('./file')
var _path = require('path')

module.exports = function api(path, type) { 
   if (type == 0) { //文件
      path = _path.resolve(path) 
      var i = $file.readFile(path)
      if (!i) return;
      var transtpl = translate(i)
      $file.wirteFile(path, transtpl)

   } else if (type == 1){ //文件夹
      $file.whileFolder(path);
   } 
}