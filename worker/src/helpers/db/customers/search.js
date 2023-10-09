// import { openDB } from '../openDB'
import {
  // extractCustomerDataForList,
  filtersChanged,
  filteredHandler
} from './lib'

import { filter } from './filter'

// const [route, action] = ['customers', 'search']

export const search = async function (filters = {}, page = 1, customersPerPage = 10) {
  console.log('SEARCH!!!', filters, page, customersPerPage)
  if (filtersChanged(filters)) await filter(filters)

  console.log(`PAGE: ${page}, CUSTOMERS PER PAGE: ${customersPerPage}`, '\nFILTERS:\n', filteredHandler())

  const { route, action, result } = await self.getCustomersWithPagination(filteredHandler(), page, customersPerPage)
  console.log('RESPONSE RESULT:\n', result)

  return { status: 200, route, action, result }
}
