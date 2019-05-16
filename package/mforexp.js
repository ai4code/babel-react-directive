var t = require('babel-types')
var $ = require('./constant') 
var $util = require('./util')
/**
 * m-for循环指令
 * 支持引用amVAR定义得属性
 * 支持引用多层循环得对象
 */
module.exports = function varExp(args, blk) {
    
    args = $util.parseFor(args)
    blk =  blk || [];
    return args.for 
      && args.for.indexOf($.AMVAR) !== -1 
    ? t.callExpression(
          t.memberExpression( 
           t.memberExpression(
            t.memberExpression(
              t.thisExpression(),
              t.identifier($.STATE)
            ),
            t.identifier(args.for.replace($.AMVAR.concat('.'), ''))
          ),
          t.identifier($.MAP)
      ),[
        t.arrowFunctionExpression( 
            [
              t.identifier(args.alias),
              t.identifier(args.iterator1)
            ], 
            {...blk.node},
            false
        )]
    ) : t.callExpression(
        t.memberExpression(
          t.identifier(args.for),
          t.identifier($.MAP)
        ), [
          t.arrowFunctionExpression( 
              [
                t.identifier(args.alias),
                t.identifier(args.iterator1)
              ], 
              {...blk.node},
              false
          )]
    )  
}