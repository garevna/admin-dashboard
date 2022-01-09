const [route, action] = ['customers', 'put']

export const updateCustomer = async function (customerId, data) {
  const response = await self.patchCustomer(customerId, data)

  return response.status !== 200 ? response : {
    status: response.status,
    route,
    action,
    result: response.result,
    message: true,
    messageType: 'Customer details',
    messageText: 'Customer details were succesfully updated'
  }
}
