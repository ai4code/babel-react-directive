var t = require('babel-types')
var $ = require('./constant') 
var $util = require('./util')

/**
 * m-bind-组件属性
 * 支持引用amVAR定义变量
 * 支持引用m-for循环中得对象属性值
 */
module.exports = function varExp(param, path) {
    var exp = $util.parseMbind(param)
    if (exp.type === $.DEFAULT) { //default
      return  t.objectProperty(
            t.stringLiteral(
                exp.key
            ),
            t.identifier(
                exp.value
            )
        )
    } 

    return t.objectProperty(
        t.stringLiteral(
            exp.key
        ),
        t.memberExpression(
            t.memberExpression(
                t.thisExpression(),
                t.identifier($.STATE) 
            ),
            t.identifier(exp.value)
        )
    )
}