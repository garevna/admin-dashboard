export function getAllData (db) {
  return new Promise(resolve => {
    const store = db.transaction('schedule', 'readonly').objectStore('schedule')

    Object.assign(store.getAll(), {
      onsuccess: event => resolve({ status: 200, result: event.target.result }),
      onerror: event => resolve({ status: event.target.errorCode, result: event.target.error })
    })
  })
}
