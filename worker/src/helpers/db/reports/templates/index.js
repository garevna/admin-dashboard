const context = require.context('./', false)

let moduleNames = context.keys().filter(key => key !== './' && key !== './index' && key !== './index.js')

moduleNames = Array.from(new Set(moduleNames))

const modules = Object.assign({}, ...moduleNames.map(name => ({ [name.split('./').join('').split('.js').join('')]: context(name) })))

module.exports = modules
