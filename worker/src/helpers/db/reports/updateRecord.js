// const countByStatus = (array, status) => array.filter(item => item.status === status).length
const countByType = (array, type) => array.filter(item => item.serviceType === type).length
const countByMonth = (array, monthName) => array.filter(item => item[monthName]).length

export const updateRecord = function (record, activeServices, pendingServices) {
  const services = {
    residential: countByType(activeServices, 'residential'),
    commercial: countByType(activeServices, 'commercial'),
    newLastMonth: countByMonth(activeServices, 'lastMonth'),
    newCurrentMonth: countByMonth(activeServices, 'currentMonth'),
    pendingResidential: countByType(pendingServices, 'residential'),
    pendingCommercial: countByType(pendingServices, 'commercial')
  }

  const connections = Object.assign({}, ...Object.keys(services)
    .map(key => ({ [key]: services[key] ? 1 : 0 })))

  for (const key of Object.keys(connections)) {
    record.connections[key] += connections[key] ? 1 : 0
  }

  record.connections.active = record.connections.residential + record.connections.commercial

  Object.assign(record.services, {
    active: record.services.active + activeServices.length,
    newCurrentMonth: record.services.newCurrentMonth + services.currentMonth,
    newLastMonth: record.services.newLastMonth + services.lastMonth,
    pending: record.services.pending + services.pendingResidential + services.pendingCommercial
  })

  return record
}
