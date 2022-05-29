import {
  testLastMonth,
  testCurrentMonth,
  getActiveServices,
  getPendingServices,
  getServiceFee
} from '../'

export const calculateServices = async (store, services) => {
  const [activeServices, pendingServices] = [getActiveServices(services), getPendingServices(services)]

  const [active, pending] = [[], []]

  for (const service of pendingServices) {
    const [date, lastMonth, currentMonth] = [service.date, testLastMonth(service), testCurrentMonth(service)]
    const { subscriptionFee, serviceType } = await getServiceFee(store, service.serviceId)
    pending.push({ date, lastMonth, currentMonth, subscriptionFee, serviceType })
  }

  for (const service of activeServices) {
    const [date, lastMonth, currentMonth] = [service.date, testLastMonth(service), testCurrentMonth(service)]
    const { subscriptionFee, serviceType } = await getServiceFee(store, service.serviceId)
    active.push({ date, lastMonth, currentMonth, subscriptionFee, serviceType })
  }

  return { active, pending }
}
