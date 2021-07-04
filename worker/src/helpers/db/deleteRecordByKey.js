import { openDB } from './openDB'

export const deleteRecordByKey = async (storeName, recordKey) => {
  const { status, result: db } = await openDB(storeName)
  if (status !== 200) return { status, result: null }

  return new Promise((resolve) => {
    const store = db.transaction([storeName], 'readwrite').objectStore(storeName)
    Object.assign(store.delete(recordKey), {
      onsuccess: event => resolve({
        status: event.target.result ? 200 : 404,
        result: event.target.result ? event.target.result : `${recordKey} not found in db store ${storeName}`
      }),
      onerror: event => resolve({ status: 500, result: event.target.error })
    })
  })
}
