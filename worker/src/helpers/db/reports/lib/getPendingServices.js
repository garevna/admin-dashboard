const getServiceDate = require('./getServiceDate')
const pendingConnectionStatusHandler = require('../handlers/pendingConnectionStatusHandler')

module.exports = services => !services ? [] : services
  .filter(service => pendingConnectionStatusHandler().admin.includes(service.status))
  .map(service => ({ serviceId: service.id, date: getServiceDate(service) }))
