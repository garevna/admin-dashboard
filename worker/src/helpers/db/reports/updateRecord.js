import { calculateServices } from './'

export const updateRecord = function (record, customer) {
  const { services } = customer

  const {
    activeServices,
    pendingServices,
    active,
    newCurrentMonth,
    newLastMonth,
    pending
  } = calculateServices(services)

  Object.assign(record.connections, {
    // active: record.connections.active + (active ? 1 : 0),
    newCurrentMonth: record.connections.newCurrentMonth + (newCurrentMonth ? 1 : 0),
    newLastMonth: record.connections.newLastMonth + (newLastMonth ? 1 : 0),
    pending: record.connections.pending + (pending ? 1 : 0)
  })

  Object.assign(record.services, {
    active: record.services.active + active,
    newCurrentMonth: record.services.newCurrentMonth + newCurrentMonth,
    newLastMonth: record.services.newLastMonth + newLastMonth,
    pending: record.services.pending + pending
  })

  return { record, activeServices, pendingServices }
}
