export const putRecord = function (store, data) {
  return new Promise((resolve) => {
    Object.assign(store.put(data), {
      onsuccess: event => {
        // self.postDebugMessage({ result: event.target.result })
        resolve({ status: 200 })
      },
      onerror: event => {
        self.postDebugMessage({ route: store, action: 'put', error: 'Error', data })
        // self.postErrorMessage({
        //   errorType: 'Save to local DB failed',
        //   errorMessage: JSON.stringify(data)
        // })
        resolve({ status: 500 })
      }
    })
  })
}
