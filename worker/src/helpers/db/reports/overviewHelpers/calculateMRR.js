const { roundFloat, getMonths } = require('../lib')

const getSum = array => array.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0)

module.exports = (dynamic, residentialDynamic, commercialDynamic, pending) => {
  const [pendingResidential, pendingCommercial] = [
    pending.filter(service => service.serviceType === 'residential'),
    pending.filter(service => service.serviceType === 'commercial')
  ]

  const [current, last, prev] = getMonths()

  const [residential, commercial] = [
    roundFloat(residentialDynamic[current] || 0),
    roundFloat(commercialDynamic[current] || 0)
  ]

  const currentMonth = {
    residential: roundFloat((residentialDynamic[current] || 0) - (residentialDynamic[last] || 0)),
    commercial: roundFloat((commercialDynamic[current] || 0) - (commercialDynamic[last] || 0))
  }

  const lastMonth = {
    residential: roundFloat((residentialDynamic[last] || 0) - (residentialDynamic[prev] || 0)),
    commercial: roundFloat((commercialDynamic[last] || 0) - (commercialDynamic[prev] || 0))
  }

  return {
    residential,
    commercial,
    lastMonth,
    currentMonth,
    pending: {
      residential: roundFloat(getSum(pendingResidential)),
      commercial: roundFloat(getSum(pendingCommercial))
    }
  }
}
