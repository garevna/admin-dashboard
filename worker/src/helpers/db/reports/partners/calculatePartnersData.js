import {
  openDB,

  getRecord,
  putRecord,
  updateRecord,
  calculateServices,
  getServicesByStatus
} from '../'

const [route, action] = ['reports', 'calculate-partners-data']

export const calculatePartnersData = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services', 'partners'], 'readwrite')
  const [customerStore, serviceStore, reportStore] = [
    transaction.objectStore('customers'),
    transaction.objectStore('services'),
    transaction.objectStore('partners')
  ]

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result

      if (cursor) {
        const customer = cursor.value
        const { resellerId: _id, services, apartmentNumber, address } = customer

        const { active: activeServices, pending: pendingServices } = await calculateServices(serviceStore, services, `${apartmentNumber}/${address}`)

        if (services.length) {
          const record = await getRecord(reportStore, _id, `${apartmentNumber}/${address}`)

          if (!record) {
            console.warn('RESELLER ID: ', _id, '\nCUSTOMER ID: ', customer._id)
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
      } else resolve({ status: 200, route, action, result: 'Partner\'s data stored' })
    }
  })
}
