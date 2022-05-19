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
    activeResidential.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    activeCommercial.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    activeResidential.filter(item => item.lastMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    activeCommercial.filter(item => item.lastMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    activeResidential.filter(item => item.currentMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    activeCommercial.filter(item => item.currentMonth).reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    pendingResidential.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0),
    pendingCommercial.reduce((res, item) => res + (parseFloat(item.subscriptionFee) || 0), 0)
  ]

  return {
    residential: Math.round(residentialMRR * 100) / 100,
    commercial: Math.round(commercialMRR * 100) / 100,
    lastMonth: {
      residential: Math.round(lastMonthResidentialMRR * 100) / 100,
      commercial: Math.round(lastMonthCommercialMRR * 100) / 100
    },
    currentMonth: {
      residential: Math.round(currentMonthResidentialMRR * 100) / 100,
      commercial: Math.round(currentMonthCommercialMRR * 100) / 100
    },
    pending: {
      residential: Math.round(pendingResidentialMRR * 100) / 100,
      commercial: Math.round(pendingCommercialMRR * 100) / 100
    }
  }
}
