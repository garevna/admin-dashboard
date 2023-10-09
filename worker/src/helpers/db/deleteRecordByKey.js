import { openDB } from './openDB'

export const deleteRecordByKey = async (storeName, recordKey) => {
  const { status, result: db } = await openDB(storeName)
  if (status !== 200) return { status, result: null }

  return new Promise((resolve) => {
    const store = db.transaction([storeName], 'readwrite').objectStore(storeName)
    Object.assign(store.delete(recordKey), {
      onsuccess: event => resolve({ status: 200, result: null }),
      onerror: event => resolve({ status: 400, result: event.target.error })
    })
  })
}
