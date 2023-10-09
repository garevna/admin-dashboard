// const { openDB } = require('../../openDB')
// const { getRecord, putRecord } = require('../store')
// const { /* updateRecord, */ calculateServices, calculateActiveServices } = require('../overviewHelpers')
// const { /* getServicesByStatus, */ brokenLinkToPartner, calculateChurn } = require('../lib')

const [route, action] = ['reports', 'calculate-partners-data']

module.exports = async function () {
  return { status: 200, route, action, result: 'Partner\'s data stored' }
  // const { status, result: db } = await openDB()
  //
  // if (status !== 200) return { status, result: db, route, action }
  //
  // const transaction = db.transaction(['customers', 'services', 'partners'], 'readwrite')
  // const [customerStore, serviceStore, reportStore] = [
  //   transaction.objectStore('customers'),
  //   transaction.objectStore('services'),
  //   transaction.objectStore('partners')
  // ]
  //
  // return new Promise((resolve) => {
  //   customerStore.openCursor().onsuccess = async (event) => {
  //     const cursor = event.target.result
  //
  //     if (cursor) {
  //       const customer = cursor.value
  //       const { services, apartmentNumber, address, _id: customerId, resellerId } = customer
  //
  //       if (services.length) {
  //         const {
  //           active: activeServices,
  //           pending: pendingServices,
  //           dynamic: customerDynamic
  //         } = await calculateServices(serviceStore, services, `${apartmentNumber}/${address}`)
  //
  //         customerDynamic.forEach(item => Object.assign(item, { customerId, resellerId }))
  //
  //         const record = await getRecord(reportStore, resellerId, `${apartmentNumber}/${address}`)
  //
  //         if (!record) return brokenLinkToPartner(resellerId, address, customer._id)
  //
  //         if (!record.dynamic) Object.assign(record, { dynamic: [] })
  //         if (!record.pending) Object.assign(record, { pending: [] })
  //
  //         record.pending.push(...pendingServices)
  //         record.dynamic.push(...customerDynamic)
  //
  //         const customerServices = Object.assign({}, calculateActiveServices(services), {
  //           residential: activeServices.filter(service => service.serviceType === 'residential').length,
  //           commercial: activeServices.filter(service => service.serviceType === 'commercial').length,
  //           pending: pendingServices.length
  //         })
  //
  //         for (const key in customerServices) Object.assign(record.services, { [key]: record.services[key] + customerServices[key] })
  //
  //         const connections = {
  //           active: customerServices.active ? 1 : 0,
  //           residential: customerServices.residential ? 1 : 0,
  //           commercial: customerServices.commercial ? 1 : 0,
  //           newLastMonth: customerServices.newLastMonth ? 1 : 0,
  //           newCurrentMonth: customerServices.newCurrentMonth ? 1 : 0,
  //           pendingResidential: pendingServices.filter(service => service.serviceType === 'residential').length ? 1 : 0,
  //           pendingCommercial: pendingServices.filter(service => service.serviceType === 'commercial').length ? 1 : 0
  //         }
  //
  //         for (const key in connections) Object.assign(record.connections, { [key]: record.connections[key] + connections[key] })
  //
  //         const churn = calculateChurn(services)
  //
  //         for (const key of ['awaitingSuspension', 'suspended', 'awaitingCancelation', 'canceled']) {
  //           for (const propName of ['total', 'lastMonth', 'currentMonth']) record.churn[key][propName] += churn[key][propName]
  //         }
  //
  //         await putRecord(reportStore, record)
  //       }
  //       cursor.continue()
  //     } else resolve({ status: 200, route, action, result: 'Partner\'s data stored' })
  //   }
  // })
}
