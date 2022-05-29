import { roundFloat } from '../'

const getSum = array => array.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0)

export const calculateMRR = (active, pending) => {
  const [activeResidential, activeCommercial, pendingResidential, pendingCommercial] = [
    active.filter(service => service.serviceType === 'residential'),
    active.filter(service => service.serviceType === 'commercial'),
    pending.filter(service => service.serviceType === 'residential'),
    pending.filter(service => service.serviceType === 'commercial')
  ]

  const [
    residentialMRR,
    commercialMRR,
    lastMonthResidentialMRR,
    lastMonthCommercialMRR,
    currentMonthResidentialMRR,
    currentMonthCommercialMRR,
    pendingResidentialMRR,
    pendingCommercialMRR
  ] = [
    getSum(activeResidential),
    getSum(activeCommercial),
    getSum(activeResidential.filter(item => item.lastMonth)),
    getSum(activeCommercial.filter(item => item.lastMonth)),
    getSum(activeResidential.filter(item => item.currentMonth)),
    getSum(activeCommercial.filter(item => item.currentMonth)),
    getSum(pendingResidential),
    getSum(pendingCommercial)
    // activeResidential.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    // activeCommercial.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    // activeResidential.filter(item => item.lastMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    // activeCommercial.filter(item => item.lastMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    // activeResidential.filter(item => item.currentMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    // activeCommercial.filter(item => item.currentMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    // pendingResidential.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    // pendingCommercial.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0)
  ]

  return {
    residential: roundFloat(residentialMRR),
    commercial: roundFloat(commercialMRR),
    lastMonth: {
      residential: roundFloat(lastMonthResidentialMRR),
      commercial: roundFloat(lastMonthCommercialMRR)
    },
    currentMonth: {
      residential: roundFloat(currentMonthResidentialMRR),
      commercial: roundFloat(currentMonthCommercialMRR)
    },
    pending: {
      residential: roundFloat(pendingResidentialMRR),
      commercial: roundFloat(pendingCommercialMRR)
    }
  }
}
