const pendingConnectionStatusHandler = require('../handlers/pendingConnectionStatusHandler')

module.exports = services => !services ? [] : services
  .filter(service => pendingConnectionStatusHandler().admin.includes(service.status))
