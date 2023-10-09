const [route, action] = ['rsp', 'customers']

export const getCustomersByResellerId = async function (resellerId) {
  const { status, result } = await self.getAllCustomers()

  if (status !== 200) return self.errorMessage('getCustomersListError')

  const { shortListOfServices } = result

  const customers = result.customers.filter(customer => customer.resellerId === resellerId)

  return { status, route, action, result: { customers, shortListOfServices } }
}
