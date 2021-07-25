export const getShortListOfCustomers = async function () {
  const [route, action] = ['customers', 'short-list']

  const response = await self.getAllCustomers()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const result = response.result.map(customer => ({
    customerId: customer._id,
    resellerId: customer.resellerId,
    uniqueCode: customer.uniqueCode,
    address: customer.address
  }))

  return { status: 200, route, action, result }
}
