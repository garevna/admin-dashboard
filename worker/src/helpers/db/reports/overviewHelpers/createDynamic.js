const { roundFloat } = require('../lib')

module.exports = (dates, sourceData) => dates
  .map(date => sourceData.filter(item => item.date <= date).reduce((sum, item) => sum + (parseFloat(item.subscriptionFee) || 0), 0))
  .map((item, index) => ({ [dates[index]]: roundFloat(item) }))
  .reduce((res, item) => Object.assign(res, item), {})
