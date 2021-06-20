import { openDB } from '../'

export const searchScheduleByCustomerId = (indexName, indexValue) => new Promise((resolve) => {
  openDB().then(response => {
    const { status, result: db } = response
    if (status !== 200) return { status, result: null }

    const transaction = db.transaction('schedule', 'readonly')
    transaction.oncomplete = event => resolve({ status: 200, result: event.target.result })
    transaction.onerror = event => resolve({ status: 700, result: event.target.result })

    const store = transaction.objectStore('schedule')
    const index = store.index(indexName)
    index.getAll(indexValue).onsuccess = event => resolve(event.target.result)
  })
})
