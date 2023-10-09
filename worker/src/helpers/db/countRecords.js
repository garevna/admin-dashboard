import { openDB } from './openDB'

export const countRecords = async function (storeName, key) {
  const { status, result: db } = await openDB(storeName)
  if (status !== 200) return { status, result: null }

  return new Promise((resolve) => {
    const store = db.transaction([storeName], 'readonly').objectStore(storeName)
    Object.assign(store.count(key), {
      onsuccess: event => resolve({ status: 200, result: event.target.result }),
      onerror: event => resolve({ status: 400, result: event.errorMessage })
    })
  })
}
