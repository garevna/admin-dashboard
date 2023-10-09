import { search } from '../db'

// const [route, action] = ['customers', 'search']

export const searchCustomers = async function (filters) {
  const response = await search(filters)

  // if (status !== 200) return self.errorMessage('searchCustomersError')

  return response
}
