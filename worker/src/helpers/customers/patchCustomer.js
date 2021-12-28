import { putRecordByKey } from '../db'
import { patch } from '../AJAX'

const [route, action] = ['customers', 'patch']

export const patchCustomer = async function (customerId, customerDetails) {
  const response = await patch(`customer/${customerId}`, customerDetails)

  if (response.status !== 200) return self.errorMessage('putCustomerDataError')

  const { status } = await putRecordByKey('customers', customerId, response.result.data)

  return status !== 200 ? self.errorMessage('putCustomerDataError')
    : { status, route, action, key: customerId, result: response.result.data }
}
