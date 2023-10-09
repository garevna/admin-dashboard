const getTariffs = require('./getTariffs')
const { createServiceDynamic } = require('../lib')

module.exports = async function (serviceStore, services) {
  const keys = Array.from(new Set(services.map(service => service.id)))
  const tariffs = await getTariffs(serviceStore, keys)

  const dynamics = services.map(service => {
    Object.assign(service, tariffs[service.id])

    const serviceDynamics = createServiceDynamic(service, tariffs[service.id])
    const dates = Object.keys(serviceDynamics)

    return {
      customerId: service.customerId,
      resellerId: service.resellerId,
      serviceId: service.id,
      serviceType: service.serviceType,
      subscriptionFee: service.subscriptionFee,
      status: service.status,
      activationDate: service.activationDate,
      data: Object.assign({}, ...dates.map(date => ({ [date]: serviceDynamics[date].subscriptionFee })))
    }
  })

  return dynamics
}
