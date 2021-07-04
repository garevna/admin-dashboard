import { putRecordByKey } from '../db'
import { get } from '../AJAX'

export const refreshCustomer = async function (customerId) {
  const [route, action] = ['customers', 'refresh-customer-details']

  const { status, result: customer } = await get(`customer/${customerId}`)
  if (status !== 200) return self.errorMessage('getCustomerDataError')

  if ((await putRecordByKey('customers', customerId, customer)).status !== 200) return self.errorMessage('putCustomerDataError')

  return { status, route, action, key: customerId, result: customer }
}
