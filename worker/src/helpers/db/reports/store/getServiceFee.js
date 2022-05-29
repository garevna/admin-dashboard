const response = {
  route: 'reports',
  action: 'calculate',
  error: true
}

export const getServiceFee = (store, serviceId, address) => new Promise(resolve => {
  Object.assign(store.get(serviceId), {
    onsuccess: ev => {
      const service = ev.target.result
      if (!service) {
        self.postMessage(Object.assign(response, {
          status: 409,
          errorType: 'Customer link to service broken',
          errorMessage: `Service for customer ${address} not found`
        }))
        resolve(null)
      } else {
        const { subscriptionFee, serviceType } = service
        resolve({ subscriptionFee, serviceType })
      }
    },
    onerror: ev => {
      self.postMessage(Object.assign(response, {
        status: 400,
        errorType: 'Local DB error',
        errorMessage: `Failed to read service details for customer ${address}`
      }))
      resolve(null)
    }
  })
})
