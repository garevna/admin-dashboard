import { openDB } from '../openDB'

import { getRecord, putRecord } from './'

export const iterateCustomers = async function () {
  const [route, action] = ['schedule', 'refresh']

  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services', 'schedule'], 'readwrite')
  const [customerStore, serviceStore, scheduleStore] = [
    transaction.objectStore('customers'),
    transaction.objectStore('services'),
    transaction.objectStore('schedule')
  ]

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = cursor.value
        if (Array.isArray(customer.services) && customer.services.length > 0) {
          const data = await Promise.all(customer.services.map(service => getRecord(serviceStore, service.id)))
          const records = self.createScheduleRecordsForCustomer(customer, data)
          await Promise.all(records.map(record => putRecord(scheduleStore, record)))
        }
        cursor.continue()
      } else {
        resolve({ status: 200, route, action })
      }
    }
  })
}
