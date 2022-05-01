import { openDB } from '../openDB'

import { getRecord, putRecord, updateRecord, calculateServices } from './'

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

        if (activeServices.length || pendingServices.length) {
          const record = await getRecord(reportStore, buildingId, `${apartmentNumber}/${address}`)

          if (!record) {
            console.log('BUILDING ID: ', buildingId)
            console.log('ADDRESS: ', address)
            console.log('CUSTOMER ID: ', customer._id)
            return
          }

          record.active.push(...activeServices)
          record.pending.push(...pendingServices)

          updateRecord(record, activeServices, pendingServices)

          await putRecord(reportStore, record)
        }

        cursor.continue()
      } else resolve({ status: 200, route, action })
    }
  })
}
