const roundFloat = require('./roundFloat')

module.exports = function (discount, tariff, date) {
  if (!discount || !discount.value) return tariff

  if (!date) date = new Date().toISOString().slice(0, 7)

  const period = discount && Array.isArray(discount.period)
    ? discount.period.map(ms => new Date(ms).toISOString().slice(0, 7))
    : [date, date]

  if ((period[0] > date || period[1] < date)) return tariff

  return discount.units === 'percent'
    ? roundFloat(tariff * (1 - discount.value / 100))
    : roundFloat(tariff - discount.value)
}
