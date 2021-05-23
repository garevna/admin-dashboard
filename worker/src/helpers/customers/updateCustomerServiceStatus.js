import { getRecordByKey, putRecordByKey } from '../db'
import { get, put } from '../AJAX'
import { getCustomerDataError, putCustomerDataError } from '../error-handlers'

export const updateCustomerServiceStatus = async function (request) {
  const [route, action] = ['customers', 'update']

  const { customerId, serviceId, serviceStatus } = request

  // self.postMessage({ status: 300, message: 'REQUEST', request })

  let { status, result: customer } = await getRecordByKey('customers', customerId)

  if (status !== 200) {
    const { status, result } = await get(`customer/${customerId}`)
    if (status !== 200) return getCustomerDataError(status)
    customer = result
  }

  const index = customer.services.findIndex(service => service.id === serviceId)
  if (index === -1) return getCustomerDataError(status)

  Object.assign(customer.services[index], {
    modified: Date.now(),
    status: serviceStatus,
    installation: request.installation || null
  })
  Object.assign(customer.services[index].log, { [Date.now()]: serviceStatus })

  // self.postMessage({ status: 300, customerId, customer })

  if ((await putRecordByKey('customers', customerId, customer)).status !== 200) return putCustomerDataError(500)

  if ((await put(`customer/${customerId}`, customer)).status !== 200) return putCustomerDataError(500)

  return { status, route, action, result: customer }
}
