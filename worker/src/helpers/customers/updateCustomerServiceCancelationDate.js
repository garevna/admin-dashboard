const [route, action] = ['customers', 'cancelation-date']

export const updateCustomerServiceCancelationDate = async function (customerId, serviceId, canceledDate) {
  const response = await self.getCustomer(customerId)

  if (response.status !== 200) return self.errorMessage('getCustomerDataError')

  const customer = response.result

  const index = customer.services.findIndex(service => service.id === serviceId)

  if (index === -1) return self.errorMessage('getCustomerServiceError')

  Object.assign(customer.services[index], { modified: Date.now() }, { canceledDate })

  const { status, result } = canceledDate <= new Date().toISOString().slice(0, 10)
    ? await self.updateCustomerServiceStatus({ customerId, serviceId, canceledDate, status: 'Canceled' })
    : await self.updateCustomerServiceStatus({ customerId, serviceId, canceledDate })

  // const { status, result } = await self.patchCustomer(customerId, { services: customer.services })

  return { status, route, action, result }
}
