import { putRecordByKey } from '../db'
import { patch } from '../AJAX'
import { sendNotification } from '../updates'

const [route, action] = ['customers', 'patch']

const response = {
  route,
  action,
  message: true,
  messageText: 'Customer details updated'
}

export const patchCustomer = async function (customerId, customerDetails) {
  const { status, result } = await patch(`customer/${customerId}`, customerDetails)

  if (status !== 200) return self.errorMessage('putCustomerDataError')

  const { resellerId, uniqueCode } = result.data

  await sendNotification(resellerId, 'customer', customerId, Object.keys(customerDetails))

  await putRecordByKey('customers', customerId, result.data)

  return Object.assign(response, { status, key: customerId, result: result.data, messageType: uniqueCode })
}
