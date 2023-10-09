const { openDB } = require('../openDB')

const update = (result, module) => Object.keys(module).forEach(key => Object.assign(result, { [key]: module[key] }))

const result = { openDB }

update(result, require('./handlers'))
update(result, require('./lib'))
update(result, require('./store'))
update(result, require('./store'))
update(result, require('./overviewHelpers'))
update(result, require('./templates'))
update(result, require('./buildings'))
update(result, require('./partners'))

module.exports = result
