module.exports = (store, _id, address) => new Promise(resolve => {
  const errorData = store.name === 'reports'
    ? { dbName: 'building', action: 'calculation-error', errorMessage: `${address} not found in reports DB` }
    : store.name === 'partners'
      ? { dbName: 'partner', action: 'calculation-error', errorMessage: `Partner for customer ${address} not found in DB` }
      : { dbName: store.name, errorMessage: `Customer ${address} error`, action: store.name }

  Object.assign(store.get(_id), {
    onsuccess: event => {
      const record = event.target.result
      if (!record) {
        self.postDebugMessage('broken-link', `Customer ${address} link to ${errorData.dbName} is broken`)
        resolve(null)
      } else resolve(record)
    },
    onerror: event => {
      self.postDebugMessage('local-db-error', `Failed to read record from  ${errorData.dbName} DB`)
      resolve(null)
    }
  })
})
