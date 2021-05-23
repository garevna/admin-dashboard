import { post } from '../AJAX'
import { postNewCustomerError } from '../error-handlers'

export const createCustomer = async function (data) {
  const [route, action] = ['customers', 'post']

  // self.postMessage({ status: 300, route, action, result: data })

  const { status, result } = await post('customer', data)

  // self.postMessage({ status: 300, route, action, result })

  if (status !== 200) return postNewCustomerError(status)

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'New customer',
    messageText: 'New customer has been succesfully created'
  }
}
