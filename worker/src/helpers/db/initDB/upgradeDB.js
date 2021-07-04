import { storeNames, dbKeys } from '../db-configs'

export function upgradeDB (db, transaction) {
  for (const storeName of storeNames) {
    db.deleteObjectStore(storeName)
    // self.postDebugMessage({ deleted: storeName })

    const store = storeName === 'categories' ? db.createObjectStore(storeName)
      : storeName === 'schedule' ? db.createObjectStore(storeName, { keyPath: 'index', autoIncrement: true })
        : db.createObjectStore(storeName, { keyPath: '_id', unique: true })

    if (dbKeys[storeName]) {
      dbKeys[storeName].forEach(key => {
        store.createIndex(key, key, { multiEntry: true })
      })
    }
  }
}
