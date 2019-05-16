var babel = require('babel-core')
var babel_traverse_1 = require("babel-traverse")  
var generate = require('babel-generator').default
var $varExp = require('./mforexp')
var $mbindExp = require('./mbindexp')
var $mifExp = require('./mifexp')
var $ = require('./constant') 

function parser(i) {  
   var ast = babel.transform(i, {extends: './.babelrc'}).ast
   babel_traverse_1.default(ast, {
    enter(path) {    
        //Mfor 
        if (
            path.node.type === $.CALL_EXPRESS 
        ) { 
            let args = path.node.arguments
            args && args.length && args.map((v) => { 
                if (v.type === $.OBJECT_EXPRESS) {
                      v.properties && v.properties.length &&v.properties.map((sv, sk) => {
                        if (sv.key && sv.key.value === $.MFOR) { //exit
                            sv.key.value = $.SETEDMFOR
                            let vl = sv.value.value
                            let newExp = $varExp(vl, path) 
                            path.replaceWith(newExp) 
                        }

                        //m-if
                        if (
                            sv.key && sv.key.value === $.MIF
                        ) { 
                            sv.key.value = $.SETTEDMIF
                            let value = sv.value.value 
                            let newExp = $mifExp({ value }, path) 
                            path.replaceWith(newExp)
                            
                        }
                      }) 
                }
            })
        } 

        //m-bind
        if (
            path.isObjectProperty 
        &&  path.node.key 
        &&  path.node.key.value
        &&  path.node.key.value.indexOf($.MBIND) !== -1
        ) {
           let value = path.node.value.value
           let key = path.node.key.value
           let newExp = $mbindExp({key, value}, path) 
           path.replaceWith(newExp)
        }  
      }
   })   
   return generate(ast).code
}

/**
 * parser render mfor 
 */
module.exports = function translate(i) { 
    return parser(i)
}