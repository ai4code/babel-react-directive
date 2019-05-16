var $ = require('./constant')
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
var stripParensRE = /^\(|\)$/g

function parseFor (exp) {
    var inMatch = exp.match(forAliasRE)
    if (!inMatch) { return }
    var res = {}
    res.for = inMatch[2].trim()
    var alias = inMatch[1].trim().replace(stripParensRE, '')
    var iteratorMatch = alias.match(forIteratorRE)
    if (iteratorMatch) {
      res.alias = alias.replace(forIteratorRE, '').trim()
      res.iterator1 = iteratorMatch[1].trim()
      if (iteratorMatch[2]) {
        res.iterator2 = iteratorMatch[2].trim()
      }
    } else {
      res.alias = alias
    }
    return res
  }

  function parseMbind(param) {
    if (!param) {
      console.error('parseMbind param is undefined!')
      return
    }
    let key, value, type
    key = param.key.split('-')[2] //property
    if (param.value.indexOf($.AMVAR) !== -1) { //state
      value = param.value.replace($.AMVAR.concat('.'), '')
      type = $.STATE_MENT
    } else {
      type = $.DEFAULT
      value = param.value
    } 
    return {
      key, value, type
    }
  }

  /**
   * mif绑定amVAR变量
   * mif绑定循环指令中对象
   * mif绑定表达式
   * @param {*} param 
   */
  function parseMif(param) {
    if (!param) {
      console.error('parseMif param is undefined!')
      return
    }
    let { value } = param;
    let type;
    if (value.indexOf($.AMVAR) !== -1) { 
      //amVAR this.state.变量
      value = value.replace($.AMVAR.concat('.'), '')
      type = $.STATE_MENT
    } else {
      type = $.DEFAULT
    }
    
    return { value, type }
  }

  module.exports = {
      parseFor,
      parseMbind,
      parseMif
  }