import { storeNames /*, mainKeys */, dbKeys } from '../db-configs'

export function upgradeDB (db, transaction) {
  for (const storeName of storeNames) {
    if (!db.objectStoreNames.contains(storeName)) {
      let store
      if (storeName === 'categories') {
        store = db.createObjectStore(storeName, { keyPath: 'index', autoIncrement: true })
      } else {
        store = db.createObjectStore(storeName, { keyPath: '_id', unique: true })
      }

      if (dbKeys[storeName]) {
        dbKeys[storeName].forEach(key => {
          store.createIndex(key, key, { multiEntry: true })
        })
      }
    } else {
      const store = transaction.objectStore(storeName)

      const keys = Array.from(store.indexNames)

      if (!dbKeys[storeName]) continue

      for (const key of dbKeys[storeName]) {
        if (!keys.includes(key)) {
          store.createIndex(key, key)
        }
      }
    }
  }
}
