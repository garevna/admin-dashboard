const calcTariff = (tariff, gstIncEx, discountValue, discountUnits) => {
  const fee = discountValue
    ? discountUnits === '%' ? (tariff * (100 - discountValue) / 100) : (tariff - discountValue)
    : tariff

  return self.roundFloat(gstIncEx ? (fee / 1.1) : fee)
}

module.exports = (serviceStore, keys) => new Promise((resolve, reject) => {
  if (!keys || !keys.length) return {}
  const serviceKeys = keys.sort()

  const keyRangeValue = IDBKeyRange.bound(serviceKeys[0], serviceKeys.slice(-1))

  Object.assign(serviceStore.getAll(keyRangeValue), {
    onsuccess: event => {
      const services = event.target.result
        .filter(service => keys.includes(service._id))
        .map(service => ({
          [service._id]: {
            subscriptionFee: calcTariff(service.subscriptionFee, service.gstIncEx, service.discountValue, service.discountUnits),
            serviceType: service.serviceType
          }
        }))

      resolve(Object.assign({}, ...services))
    },
    onerror: event => {
      console.warn(event)
      reject && typeof reject === 'function' ? reject(event.target) : resolve(null)
    }
  })
})
