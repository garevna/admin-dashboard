import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
// import { refreshStatistics } from '../db/customers'

const [route, action] = ['customers', 'refresh']

export const downloadAllCustomers = async function () {
  const perPage = 100

  let currentPage = 1
  let done = false

  await clearStore('customers')

  while (!done) {
    const { status, result: customers, page, pages } = await get(`customer?page=${currentPage++}&per_page=${perPage}`)
    if (status !== 200) return self.errorMessage('refreshCustomersListError')

    done = page >= pages

    const promises = customers.map(customer => putRecordByKey('customers', customer._id, customer))

    const response = await Promise.all(promises)

    if (response.find(item => item.status !== 200)) self.errorMessage('refreshCustomersListError')
  }

  return { status: 200, route, action, result: 'OK' }
}
