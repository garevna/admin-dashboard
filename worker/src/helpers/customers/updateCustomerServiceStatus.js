import { getCustomer, putCustomer } from './'
import { getCustomerServiceError } from '../error-handlers'

export const updateCustomerServiceStatus = async function (request) {
  const { customerId, serviceId, status, lots, installation } = request

  const response = await getCustomer(customerId)

  // self.postMessage({ status: 300, message: 'CUSTOMER', response })

  if (response.status !== 200) return response

  const customer = response.result

  const index = customer.services.findIndex(service => service.id === serviceId)

  // self.postMessage({ status: 300, message: 'CUSTOMER SERVICE', response: { index, services: customer.services } })

  if (index === -1) return getCustomerServiceError(status)

  Object.assign(customer.services[index], {
    modified: Date.now(),
    status,
    lots,
    installation
  })
  Object.assign(customer.services[index].log, { [Date.now()]: status })

  // self.postMessage({ status: 300, message: 'UPDATE CUSTOMER SERVICE STATUS UPDATE', customer })

  return await putCustomer(customerId, customer)
}
