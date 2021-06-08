const { getCustomerServiceError } = require('../error-handlers').default

export const updateCustomerServiceStatus = async function (request) {
  const { customerId, serviceId, status, lots, installation } = request

  const response = await self.getCustomer(customerId)

  if (response.status !== 200) return response

  const customer = response.result

  const index = customer.services.findIndex(service => service.id === serviceId)

  if (index === -1) return getCustomerServiceError(status)

  Object.assign(customer.services[index], {
    modified: Date.now(),
    status,
    lots,
    installation
  })

  Object.assign(customer.services[index].log, { [Date.now()]: status })

  return await self.putCustomer(customerId, customer)
}
