const {
  evaluateDiscount,
  getActiveServices,
  getPendingServices,
  createServiceDynamic
} = require('../lib')

const { getServiceFee } = require('../store')

module.exports = async (store, services, address) => {
  const [activeServices, pendingServices] = [getActiveServices(services), getPendingServices(services)]

  const [active, pending, dynamic] = [[], [], []]

  for (const service of services) {
    const { subscriptionFee: tariff, serviceType } = await getServiceFee(store, service.id, address)

    const serviceDynamic = createServiceDynamic(service, tariff)

    Object.keys(serviceDynamic).length && dynamic.push({
      serviceId: service.id,
      serviceType,
      data: serviceDynamic
    })
  }

  for (const service of activeServices) {
    const { subscriptionFee: tariff, serviceType } = await getServiceFee(store, service.serviceId, address)

    active.push({
      subscriptionFee: evaluateDiscount(service.discount, tariff),
      serviceType
    })
  }

  for (const service of pendingServices) {
    const { subscriptionFee: tariff, serviceType } = await getServiceFee(store, service.serviceId, address)

    pending.push({
      subscriptionFee: evaluateDiscount(service.discount, tariff),
      serviceType
    })
  }

  return { active, pending, dynamic }
}
