const { getServiceDate } = require('../lib')

module.exports = services => {
  const date = new Date()
  const [currentDate, lastDate] = [date, new Date(date.getFullYear(), date.getMonth())]
    .map(d => d.toISOString().slice(0, 7))

  const activeServices = services.filter(service => service.status === 'Active')

  return {
    active: activeServices.length,
    residential: activeServices.filter(service => service.serviceType === 'residential').length,
    commercial: activeServices.filter(service => service.serviceType === 'commercial').length,
    newCurrentMonth: activeServices.filter(service => getServiceDate(service) === currentDate).length,
    newLastMonth: activeServices.filter(service => getServiceDate(service) === lastDate).length
  }
}
