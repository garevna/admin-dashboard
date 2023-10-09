const filterForPendingServices = require('./filterForPendingServices')
const getResidential = require('./getResidential')
const getCommercial = require('./getCommercial')
const getNewCurrentMonth = require('./getNewCurrentMonth')
const getNewLastMonth = require('./getNewLastMonth')

module.exports = dynamic => {
  const [activeServices, pendingServices] = [
    dynamic.filter(record => record.status === 'Active'),
    filterForPendingServices(dynamic)
  ]

  const [residential, commercial, pending] = [
    getResidential(activeServices).length,
    getCommercial(activeServices).length,
    pendingServices.length
  ]

  return {
    active: residential + commercial,
    residential,
    commercial,
    newCurrentMonth: getNewCurrentMonth(activeServices),
    newLastMonth: getNewLastMonth(activeServices),
    pending
  }
}
