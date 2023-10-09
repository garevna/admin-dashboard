const getNewCurrentMonth = require('./getNewCurrentMonth')
const getNewLastMonth = require('./getNewLastMonth')

const filterConnections = records => Array.from(new Set(records.map(record => record.customerId))).length

const getResidential = require('./getResidential')
const getCommercial = require('./getCommercial')
const filterForPendingServices = require('./filterForPendingServices')

module.exports = dynamic => {
  const [activeConnections, pendingConnections] = [
    dynamic.filter(record => record.status === 'Active'),
    filterForPendingServices(dynamic)
  ]

  const [residential, commercial, pendingResidential, pendingCommercial] = [
    filterConnections(getResidential(activeConnections)),
    filterConnections(getCommercial(activeConnections)),
    filterConnections(getResidential(pendingConnections)),
    filterConnections(getCommercial(pendingConnections))
  ]

  return {
    active: residential + commercial,
    residential,
    commercial,
    newCurrentMonth: getNewCurrentMonth(activeConnections),
    newLastMonth: getNewLastMonth(activeConnections),
    pendingResidential,
    pendingCommercial
  }
}
