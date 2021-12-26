import { get } from '../AJAX'
import { putRecordByKey } from '../db'
import { refreshStatistics } from '../db/customers'

export const refreshUpdatedCustomersOnly = async function () {
  const [route, action] = ['customers', 'refresh']

  const perPage = 100

  let currentPage = 1
  let done = false

  while (!done) {
    const { status, result, page, pages } = await get(`customer?changed=true&page=${currentPage++}&per_page=${perPage}`)
    if (status !== 200) return self.errorMessage('refreshCustomersListError')
    done = page >= pages

    for (const customer of result) {
      const { _id } = customer
      const { status } = await putRecordByKey('customers', _id, customer)
      if (status !== 200) return self.errorMessage('refreshCustomersListError')
    }
  }

  refreshStatistics()

  return { status: 200, route, action, result: (await self.getAllCustomers()).result }
}
