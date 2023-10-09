import { openDB } from './openDB'

export const putRecords = async (storeName, records) => new Promise((resolve) => {
  openDB(storeName)
    .then((response) => {
      const { status, result: db } = response
      if (status !== 200) return resolve({ status, result: 'Open IndexedDB error' })

      const transaction = Object.assign(db.transaction([storeName], 'readwrite'), {
        oncomplete: event => resolve({ status: 200 }),
        onerror: event => resolve({ status: event.errorCode, result: 'IndexedDB saving data error' })
      })

      records.forEach(record => transaction.objectStore(storeName).add(record))
    })
})
