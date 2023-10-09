module.exports = (store, minKey, maxKey) => new Promise((resolve, reject) => Object.assign(store.getAll(IDBKeyRange.bound(minKey, maxKey)), {
  onsuccess: event => resolve(event.target.result),
  onerror: event => reject(event.target.result)
}))
