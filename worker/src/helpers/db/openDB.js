import { dbName, dbVersionHandler, upgradeNeededEventHandler } from './'

export const openDB = () => new Promise((resolve) => Object.assign(indexedDB.open(dbName, dbVersionHandler()), {
  onversionchange: (event) => {
    // self.postDebugMessage({ message: `OPEN DB: version change event ${dbVersionHandler()}` })
    self.postDebugMessage({
      message: 'OPEN DB: version change event',
      oldVersion: event.oldVersion,
      newVersion: event.newVersion
    })

    resolve({ status: 200, result: event.target.result })
  },
  onblocked: (event) => {
    // self.postDebugMessage({ message: `OPEN DB: blocked event ${dbVersionHandler()}` })
    resolve({ status: 0, result: null })
  },

  onupgradeneeded: upgradeNeededEventHandler,

  onsuccess: event => {
    // self.postDebugMessage({ message: `OPEN DB: success event ${dbVersionHandler()}` })
    resolve({ status: 200, result: event.target.result })
  },

  onerror: event => {
    self.postDebugMessage({
      errorType: 'OPEN DB ERROR EVENT',
      errorCode: event.target.error.code,
      errorName: `${event.target.error.name}: DB ver ${dbVersionHandler()}`,
      errorMessage: event.target.error.message
    })
  }
}))
