import { storeNames, /* mainKeys, */ dbKeys } from '../db-configs'

import { dbVersionHandler } from './'

export function correctVersionNumber (db) {
  for (const storeName of storeNames) {
    if (!db.objectStoreNames.contains(storeName)) return dbVersionHandler(db.version + 1)
  }

  for (const storeName of storeNames) {
    // if (!mainKeys[storeName] && !dbKeys[storeName]) continue
    //
    const store = db.transaction([storeName], 'readwrite').objectStore(storeName)
    //
    // if (JSON.stringify(mainKeys[storeName]) && JSON.stringify(store.keyPath) !== JSON.stringify(mainKeys[storeName])) {
    //   self.postMessage({ status: 300, route: storeName, action: 'main-keys', result: { storeKeyPath: store.keyPath, mainKeyPath: mainKeys[storeName] } })
    //   return dbVersionHandler(db.version + 1)
    // }

    const keys = Array.from(store.indexNames)

    if (!dbKeys[storeName]) continue

    for (const item of dbKeys[storeName]) {
      // self.postMessage({ status: 300, route: storeName, action: 'indexes', result: { storeKeys: keys, indexName: item } })
      if (!keys.includes(item)) return dbVersionHandler(db.version + 1)
    }
  }
  return dbVersionHandler(db.version)
}
