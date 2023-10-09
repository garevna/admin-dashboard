import { openDB } from '../db/openDB'
import { filteredHandler, generator } from './lib'

import { filterCustomers } from './filterCustomers'

const [route, action] = ['customers', 'get-filtered-and-paginated']

export const getCustomersWithPagination = async function (filters, page, customersPerPage) {
  await filterCustomers(filters)

  const response = await openDB()

  if (response.status !== 200) return Object.assign(response, { route, action })

  const db = response.result

  const customers = []

  const store = db.transaction(['customers'], 'readonly').objectStore('customers')

  const total = filteredHandler().length

  const keys = filteredHandler()
    .slice((page - 1) * customersPerPage, page * customersPerPage)

  for await (const item of generator(store, keys)) customers.push(item)

  const result = Object.assign({}, {
    customers,
    total,
    pages: Math.ceil(keys.length / customersPerPage)
  })

  return { status: 200, route, action, result }
}
