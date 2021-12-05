import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

export const hardCustomersRefresh = async function () {
  const [route, action] = ['customers', 'hard-refresh']

  const perPage = 30

  let currentPage = 1
  let done = false
  let counter = 0

  await clearStore('customers')

  while (!done) {
    const { status, result, page, pages } = await get(`customer?page=${currentPage++}&per_page=${perPage}`)
    if (status !== 200) return self.errorMessage('refreshCustomersListError')
    done = page >= pages

    for (const customer of result) {
      self.postDebugMessage({ num: counter++, customer: customer.address })
      const { _id } = customer
      const { status } = await putRecordByKey('customers', _id, customer)
      if (status !== 200) return self.errorMessage('refreshCustomersListError')
    }
  }

  return { status: 200, route, action, result: (await self.getAllCustomers()).result }
}
