export const putRecord = function (store, data) {
  return new Promise((resolve) => {
    Object.assign(store.put(data), {
      onsuccess: event => resolve({ status: 200 }),
      onerror: event => {
        console.warn({ route: store, action: 'put', error: 'Error', data })
        resolve({ status: 400 })
      }
    })
  })
}
