export const getRecord = function (store, key) {
  return new Promise((resolve, reject) => {
    Object.assign(store.get(key), {
      onsuccess: event => resolve(event.target.result),
      onerror: event => reject(event)
    })
  })
}
