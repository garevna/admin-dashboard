import { getRecordByKey, putRecordByKey } from '../db'
import { get } from '../AJAX'

const { getCustomerDataError, putCustomerDataError } = require('../error-handlers').default

export const getCustomer = async function (customerId) {
  const [route, action] = ['customers', 'get']

  let { status, result: customer } = await getRecordByKey('customers', customerId)

  if (status !== 200) {
    const { status, result } = await get(`customer/${customerId}`)
    if (status !== 200) return getCustomerDataError(status)
    customer = result
    if ((await putRecordByKey('customers', customerId, customer)).status !== 200) return putCustomerDataError(500)
  }

  return { status, route, action, key: customerId, result: customer }
}
