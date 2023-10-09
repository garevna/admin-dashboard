const testLastMonth = require('./testLastMonth')
const testCurrentMonth = require('./testCurrentMonth')

module.exports = (services, status) => !services ? [] : services
  .filter(service => service.status === status)
  .map(service => ({ date: new Date(Object.keys(service.log).pop() - 0).toISOString().slice(0, 7) }))
  .map(item => ({
    total: 1,
    lastMonth: testLastMonth(item),
    currentMonth: testCurrentMonth(item)
  }))
  .reduce((result, item) => ({
    total: result.total + item.total,
    lastMonth: result.lastMonth + item.lastMonth,
    currentMonth: result.currentMonth + item.currentMonth
  }), { total: 0, lastMonth: 0, currentMonth: 0 })
