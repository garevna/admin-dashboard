module.exports = (customerStoreIndex, buildingId) => new Promise((resolve, reject) => Object.assign(customerStoreIndex.getAll(buildingId), {
  onsuccess: event => resolve(event.target.result),
  onerror: event => console.warn(event.target.error)
}))
