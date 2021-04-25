import { getRecordByKey, putRecordByKey } from '../db'
import { put } from '../AJAX'
import { getCustomerDataError, putCustomerDataError } from '../error-handlers'

export const updateCustomer = async function (id, data) {
  const [route, action] = ['customers', 'update']

  const { status: getStatus, result: getResult } = await getRecordByKey('customers', id)

  if (getStatus !== 200) return getCustomerDataError(getStatus)

  const response = Object.assign({}, getResult, data)

  self.postMessage({ status: 300, route, action, result: response })

  const { status: putStatus } = await putRecordByKey('customers', id, response)

  if (putStatus !== 200) return putCustomerDataError(putStatus)

  const { status, result } = await put(`customer/${id}`, response)

  self.postMessage({ status: 300, route, action, result })

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
