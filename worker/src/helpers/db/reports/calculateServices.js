import {
  lastMonth,
  currentMonth,
  getActiveServices,
  getPendingServices
} from './'

export const calculateServices = services => {
  const [activeServices, pendingServices] = [getActiveServices(services), getPendingServices(services)]
  const [active, newCurrentMonth, newLastMonth, pending] = [
    activeServices.length,
    activeServices.filter(service => currentMonth(service)).length,
    activeServices.filter(service => lastMonth(service)).length,
    pendingServices.length
  ]

  return {
    activeServices,
    pendingServices,
    active,
    newCurrentMonth,
    newLastMonth,
    pending
  }
}
