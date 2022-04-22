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
    activeResidential.reduce((res, item) => res + item.subscriptionFee, 0),
    activeCommercial.reduce((res, item) => res + item.subscriptionFee, 0),
    activeResidential.filter(item => item.lastMonth).reduce((res, item) => res + item.subscriptionFee, 0),
    activeCommercial.filter(item => item.lastMonth).reduce((res, item) => res + item.subscriptionFee, 0),
    activeResidential.filter(item => item.currentMonth).reduce((res, item) => res + item.subscriptionFee, 0),
    activeCommercial.filter(item => item.currentMonth).reduce((res, item) => res + item.subscriptionFee, 0),
    pendingResidential.reduce((res, item) => res + item.subscriptionFee, 0),
    pendingCommercial.reduce((res, item) => res + item.subscriptionFee, 0)
  ]

  return {
    residential: residentialMRR,
    commercial: commercialMRR,
    lastMonth: {
      residential: lastMonthResidentialMRR,
      commercial: lastMonthCommercialMRR
    },
    currentMonth: {
      residential: currentMonthResidentialMRR,
      commercial: currentMonthCommercialMRR
    },
    pending: {
      residential: pendingResidentialMRR,
      commercial: pendingCommercialMRR
    }
  }
}
