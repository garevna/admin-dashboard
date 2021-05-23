import { getRecordByKey, putRecordByKey } from '../db'
import { put } from '../AJAX'
import { getCustomerDataError, putCustomerDataError } from '../error-handlers'

export const updateCustomer = async function (id, data) {
  const [route, action] = ['customers', 'update']

  const { status: customerStatus, result: customer } = await getRecordByKey('customers', id)

  if (customerStatus !== 200) return getCustomerDataError(customerStatus)

  const response = Object.assign({}, customer, data)

  if ((await putRecordByKey('customers', id, response)).status !== 200) return putCustomerDataError(400)

  const { status, result } = await put(`customer/${id}`, response)

  if (status !== 200) return putCustomerDataError(status)

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Customer details',
    messageText: 'Customer details were succesfully updated'
  }
}
