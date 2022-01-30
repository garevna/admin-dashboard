import { sendNotification } from '../updates'

const [route, action] = ['customers', 'patch']

export const updateCustomer = async function (customerId, data) {
  const response = await self.patchCustomer(customerId, data)

  const { status, result } = response

  await sendNotification(result.resellerId, 'customer', result._id)

  return status !== 200 ? response : {
    status,
    route,
    action,
    result: response.result,
    message: true,
    messageType: result.address,
    messageText: 'Customer details were succesfully updated'
  }
}
