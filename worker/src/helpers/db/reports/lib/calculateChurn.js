const getServicesByStatus = require('./getServicesByStatus')

module.exports = function (services) {
  return {
    awaitingSuspension: getServicesByStatus(services, 'Awaiting to be suspended'),
    suspended: getServicesByStatus(services, 'Suspended'),
    awaitingCancelation: getServicesByStatus(services, 'Awaiting for cancelation'),
    canceled: getServicesByStatus(services, 'Canceled'),
    notConnected: getServicesByStatus(services, 'Not connected')
  }
}
