import { putRecordByKey } from '../db'
import { put } from '../AJAX'

const { putCustomerDataError } = require('../error-handlers').default

export const putCustomer = async function (customerId, customerDetails) {
  const [route, action] = ['customers', 'put']

  const response = await put(`customer/${customerId}`, customerDetails)
  const { status } = await putRecordByKey('customers', customerId, customerDetails)

  return response.status !== 200 || status !== 200 ? putCustomerDataError(500)
    : { status, route, action, key: customerId, result: customerDetails }
}
