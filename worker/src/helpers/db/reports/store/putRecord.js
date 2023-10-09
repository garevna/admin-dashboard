const response = {
  route: 'reports',
  // action: 'calculate',
  status: 400,
  error: true,
  errorType: 'Local DB error'
}

module.exports = (reportStore, data) => new Promise(resolve => {
  Object.assign(response, { action: reportStore.name === 'reports' ? 'calculate' : 'partners' })

  Object.assign(reportStore.put(data), {
    onsuccess: e => {
      const result = e.target.result
      if (!result) {
        self.postMessage(Object.assign(response, { errorMessage: `Record for ${data.address} not saved` }))
        resolve(null)
      } else resolve(result)
    },
    onerror: event => {
      self.postMessage(Object.assign(response, { errorMessage: `Record for ${data.address} not saved` }))
      resolve(null)
    }
  })
})
