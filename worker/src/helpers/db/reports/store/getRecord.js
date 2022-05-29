const response = {
  route: 'reports',
  error: true
}

export const getRecord = (store, _id, address) => new Promise(resolve => {
  const errorData = store.name === 'reports'
    ? { dbName: 'building', action: 'calculate', errorMessage: `${address} not found in reports DB` }
    : store.name === 'partners'
      ? { dbName: 'partner', action: store.name, errorMessage: `Partner for customer ${address} not found in DB` }
      : { dbName: store.name, errorMessage: `Customer ${address} error`, action: store.name }
  Object.assign(response, { action: errorData.action || response })
  Object.assign(store.get(_id), {
    onsuccess: event => {
      const record = event.target.result
      if (!record) {
        self.postMessage(Object.assign(response, {
          status: 409,
          errorType: `Customer link to ${errorData.dbName} DB broken`,
          errorMessage: errorData.errorMessage
        }))
        resolve(null)
      } else resolve(record)
    },
    onerror: event => {
      self.postMessage(Object.assign(response, {
        status: 400,
        errorType: 'Local DB error',
        errorMessage: `Failed to read record from  ${errorData.dbName} DB`
      }))
      resolve(null)
    }
  })
})
