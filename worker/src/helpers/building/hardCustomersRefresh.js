import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

const [route, action] = ['customers', 'hard-refresh']

export const hardCustomersRefresh = async function () {
  const perPage = 100

  let currentPage = 1
  let done = false

  await clearStore('customers')

  while (!done) {
    const { status, result, page, pages } = await get(`customer?page=${currentPage++}&per_page=${perPage}`)
    if (status !== 200) return self.errorMessage('refreshCustomersListError')
    done = page >= pages

    for (const customer of result) {
      const { _id } = customer

      const { status } = await putRecordByKey('customers', _id, customer)

      if (status !== 200) return self.errorMessage('refreshCustomersListError')
    }
  }

  return { status: 200, route, action, result: (await self.getAllCustomers()).result }
}
