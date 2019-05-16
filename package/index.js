var api = require('./api')

module.exports = function babelTranslateDirective(path, type = 0) {
    if (!path) {
        console.error('please input folder/file path!')
        return
    } 
    return api(path, type)
}