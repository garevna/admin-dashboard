import { putRecordByKey } from '../db'
import { get } from '../AJAX'

const { getCustomerDataError, putCustomerDataError } = require('../error-handlers').default

export const refreshCustomer = async function (customerId) {
  const [route, action] = ['customers', 'refresh-customer-details']

  const { status, result: customer } = await get(`customer/${customerId}`)
  if (status !== 200) return getCustomerDataError(status)

  if ((await putRecordByKey('customers', customerId, customer)).status !== 200) return putCustomerDataError(500)

  return { status, route, action, key: customerId, result: customer }
}
