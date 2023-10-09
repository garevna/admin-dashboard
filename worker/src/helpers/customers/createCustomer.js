import { post } from '../AJAX'

const [route, action] = ['customers', 'post']

export const createCustomer = async function (data) {
  const { status, result } = await post('customer', data)

  if (status !== 200) return self.errorMessage('postNewCustomerError')

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
