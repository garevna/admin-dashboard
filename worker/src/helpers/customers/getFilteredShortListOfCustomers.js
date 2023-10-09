export const getFilteredShortListOfCustomers = async function (filter) {
  const [route, action] = ['customers', 'filtered-short-list']

  const response = await self.getShortListOfCustomers()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const result = response.result.filter(customer => filter.includes(customer.customerId))

  return { status: 200, route, action, result }
}
