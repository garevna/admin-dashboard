export const updateCustomerServiceStatus = async function (request) {
  const {
    customerId,
    serviceId,
    status,
    lots,
    installation,
    activationDate,
    suspendDate,
    cancelDate,
    resumeDate,
    suspendedDate,
    canceledDate,
    resumedDate
  } = request.data ? request.data : request

  const response = await self.getCustomer(customerId)

  if (response.status !== 200) return Object.assign(response, { errorMessage: 'Customer not found' })

  const customer = response.result

  const index = customer.services.findIndex(service => service.id === serviceId)

  if (index === -1) return self.errorMessage('getCustomerServiceError')

  Object.assign(customer.services[index], {
    modified: Date.now(),
    status,
    lots,
    installation,
    activationDate,
    suspendDate,
    cancelDate,
    resumeDate,
    suspendedDate,
    canceledDate,
    resumedDate,
    log: Object.assign(customer.services[index].log, { [Date.now()]: status })
  })

  return await self.patchCustomer(customerId, { services: customer.services })
}
