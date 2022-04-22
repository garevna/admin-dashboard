const response = {
  route: 'reports',
  action: 'calculate',
  error: true
}

export const getRecord = (store, buildingId, address) => new Promise(resolve => {
  Object.assign(store.get(buildingId), {
    onsuccess: event => {
      const record = event.target.result
      if (!record) {
        self.postMessage(Object.assign(response, {
          status: 409,
          errorType: 'Customer link to building broken',
          errorMessage: `Building ${address} not found`
        }))
        resolve(null)
      } else resolve(record)
    },
    onerror: event => {
      self.postMessage(Object.assign(response, {
        status: 400,
        errorType: 'Local DB error',
        errorMessage: `Failed to read record ${address}`
      }))
      resolve(null)
    }
  })
})
