const generateDates = require('./generateDates')
const evaluateDiscount = require('./evaluateDiscount')

module.exports = function (service, tariff) {
  if (!service.activationDate) return {}
  const dates = generateDates(service.activationDate)

  const result = Object.assign({}, ...dates.map(date => ({ [date]: 0 })))

  for (const date of Object.keys(result)) {
    result[date] = date < service.activationDate ? 0 : evaluateDiscount(service.discount, tariff, date)
  }

  if (!service.suspendedDate && !service.canceledDate) return result

  let suspended = service.suspendedDate
    ? dates.filter(date => date >= service.suspendedDate.slice(0, 7))
    : []

  suspended = service.resumedDate
    ? suspended.filter(date => service.resumedDate.slice(0, 7) > date)
    : suspended

  for (const d of suspended) result[d] = 0

  const canceled = service.canceledDate
    ? dates.filter(date => date >= service.canceledDate.slice(0, 7))
    : []
  for (const d of canceled) result[d] = 0

  return result
}
