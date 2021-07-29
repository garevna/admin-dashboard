export const updateCustomer = async function (customerId, data) {
  const [route, action] = ['customers', 'put']

  let response = await self.getCustomer(customerId)

  if (response.status !== 200) return response

  const customer = Object.assign({}, response.result, data)

  response = await self.putCustomer(customerId, data)

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
