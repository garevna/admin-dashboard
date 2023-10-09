const { customerServicePropNames } = require('../../configs/customerServicePropNames')

const getProps = (request, customerService) => customerServicePropNames.map(key => ({ [key]: request[key] || customerService[key] || null }))

export const updateCustomerServiceStatus = async function (request) {
  const { customerId, serviceId } = request

  const { status, result: customer } = await self.getCustomer(customerId)
  if (status !== 200) return self.errorMessage('getCustomerDataError')

  const index = customer.services.findIndex(service => service.id === serviceId)
  if (index === -1) return self.errorMessage('getCustomerServiceError')

  const data = Object.assign({}, ...getProps(request, customer.services[index]))

  Object.assign(customer.services[index], { modified: Date.now() }, data, {
    log: Object.assign(customer.services[index].log, { [Date.now()]: data.status })
  })

  return await self.patchCustomer(customerId, { services: customer.services })
}
