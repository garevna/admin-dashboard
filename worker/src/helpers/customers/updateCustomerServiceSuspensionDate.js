const [route, action] = ['customers', 'suspension-date']

export const updateCustomerServiceSuspensionDate = async function (customerId, serviceId, suspendedDate) {
  const response = await self.getCustomer(customerId)

  if (response.status !== 200) return Object.assign(response, { errorMessage: 'Customer not found' })

  const customer = response.result

  const index = customer.services.findIndex(service => service.id === serviceId)

  if (index === -1) return self.errorMessage('getCustomerServiceError')

  Object.assign(customer.services[index], { modified: Date.now() }, { suspendedDate })

  const { status, result } = await self.patchCustomer(customerId, { services: customer.services })

  return { status, route, action, result }
}
