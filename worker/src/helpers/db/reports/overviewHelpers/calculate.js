import {
  openDB,

  getRecord,
  putRecord,
  updateRecord,
  calculateServices,
  getServicesByStatus
} from '../'

const [route, action] = ['reports', 'calculate']

export const calculate = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services', 'reports'], 'readwrite')
  const [customerStore, serviceStore, reportStore] = [
    transaction.objectStore('customers'),
    transaction.objectStore('services'),
    transaction.objectStore('reports')
  ]

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result

      if (cursor) {
        const customer = cursor.value
        const { buildingId, services, apartmentNumber, address } = customer

        const { active: activeServices, pending: pendingServices } = await calculateServices(serviceStore, services, `${apartmentNumber}/${address}`)

        if (services.length) {
          const record = await getRecord(reportStore, buildingId, `${apartmentNumber}/${address}`)

          if (!record) {
            console.group('ERROR! Customer\' link to building is broken')
            console.warn('BUILDING ID: ', buildingId)
            console.warn('ADDRESS: ', address)
            console.warn('CUSTOMER ID: ', customer._id)
            console.groupEnd('Customer\' link to building is broken')
            return
          }

          record.active.push(...activeServices)
          record.pending.push(...pendingServices)

          const churn = {
            awaitingSuspension: getServicesByStatus(services, 'Awaiting to be suspended'),
            suspended: getServicesByStatus(services, 'Suspended'),
            awaitingCancelation: getServicesByStatus(services, 'Awaiting for cancelation'),
            canceled: getServicesByStatus(services, 'Canceled'),
            notConnected: getServicesByStatus(services, 'Not connected')
          }

          updateRecord(record, activeServices, pendingServices, churn)

          await putRecord(reportStore, record)
        }

        cursor.continue()
      } else resolve({ status: 200, route, action })
    }
  })
}
