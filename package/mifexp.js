var t = require('babel-types')
var $ = require('./constant') 
var $util = require('./util')
/**
 * m-if指令
 * 支持引用amVAR定义得属性
 * 支持引用循环指令得索引
 * 支持表达式--咱不支持
 */
module.exports = function varExp(param, path) {  
   var exp =  $util.parseMif(param); 
   if (exp.type === $.STATE_MENT) { //Statement
      return  t.conditionalExpression(
          t.memberExpression(
              t.memberExpression(
                  t.thisExpression(),
                  t.identifier($.STATE)
              ), t.identifier(exp.value)
          ),
          {...path.node},
          {
              type: 'NullLiteral'
          }
      )
   }
   return  t.conditionalExpression(
    t.identifier(exp.value),
    {...path.node},
    {
        type: 'NullLiteral'
    }
)
}
