import { openDB } from '../openDB'

// import { getRecord, putRecord } from './'

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
          store.openCursor().onsuccess = async (ev) => {
            const statisticsCursor = ev.target.result
            if (statisticsCursor) {
              const record = statisticsCursor.value
              if (record._id !== service.id) statisticsCursor.continue()
              cursor.continue()
            } else {
              serviceStore.get(service.id).onsuccess = function (e) {
                const { _id, serviceName, subscriptionFee, downstreamSpeed, upstreamSpeed, productType } = e.target.result
                const record = { _id, id: service.id, serviceName, subscriptionFee, productType, speed: Math.min(downstreamSpeed, upstreamSpeed), data: [] }
                Object.assign(store.put(record, _id), {
                  onsuccess: evnt => console.log(evnt.target.result),
                  onerror: evnt => console.log(evnt)
                })
              }
            }
          }
        }
        cursor.continue()
      } else {
        resolve({ status: 200, route, action })
      }
    }
  })
}
