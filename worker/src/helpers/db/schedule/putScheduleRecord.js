import { openDB } from '../openDB'

export async function putScheduleRecord (data) {
  const { result: db } = await openDB()

  return new Promise((resolve) => {
    const transaction = Object.assign(db.transaction('schedule', 'readwrite'), {
      onerror: event => resolve({ status: event.target.errorCode, result: null }),
      oncomplete: event => resolve({ status: 200, result: event.target.result })
    })
    const store = transaction.objectStore('schedule')
    store.put(data)
  })
}
