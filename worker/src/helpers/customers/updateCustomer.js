import { getCustomer, putCustomer } from './'

export const updateCustomer = async function (customerId, data) {
  const [route, action] = ['customers', 'update']

  let response = await getCustomer('customers', customerId)

  if (response.status !== 200) return response

  const customer = Object.assign({}, response.result, data)

  response = await putCustomer(customerId, customer)

  return response.status !== 200 ? response : {
    status: response.status,
    route,
    action,
    result: customer,
    message: true,
    messageType: 'Customer details',
    messageText: 'Customer details were succesfully updated'
  }
}
