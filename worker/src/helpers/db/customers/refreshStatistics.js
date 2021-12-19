import { openDB } from '../openDB'

import { getRecord, putRecord } from './'

const [route, action] = ['statistics', 'refresh']

export const refreshStatistics = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services', 'statistics'], 'readwrite')
  const [customerStore, serviceStore, store] = [
    transaction.objectStore('customers'),
    transaction.objectStore('services'),
    transaction.objectStore('statistics')
  ]

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = cursor.value
        if (!Array.isArray(customer.services) && !customer.services.length) cursor.continue()

        for (const service of customer.services) {
          let { /* status, */ result: record } = await getRecord(store, service.id)
          // self.postDebugMessage({ statisticsRecord: { status, record } })
          if (!record) {
            const { serviceName, subscriptionFee, downstreamSpeed, upstreamSpeed, productType } = (await getRecord(serviceStore, service.id)).result
            record = { serviceName, subscriptionFee, productType, speed: Math.min(downstreamSpeed, upstreamSpeed), data: [] }
          }
          record.data.push({
            customerId: customer._id,
            status: service.status,
            modified: service.modified
          })
          await putRecord(store, service.id, record)
        }
        cursor.continue()
      } else {
        resolve({ status: 200, route, action })
      }
    }
  })
}
