export const getCustomersByResellerId = async function (resellerId) {
  const [route, action] = ['customers', 'list']

  const { status, result } = await self.getAllCustomers()

  if (status !== 200) return self.errorMessage('getCustomersListError')

  return { status, route, action, result: result.filter(customer => customer.resellerId === resellerId) }
}
