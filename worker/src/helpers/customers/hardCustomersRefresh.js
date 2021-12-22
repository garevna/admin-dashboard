import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
// import { updateStatistics } from '../db/customers'

// const { updatesController } = require('../../controllers')

export const hardCustomersRefresh = async function () {
  const [route, action] = ['customers', 'hard-refresh']

  const perPage = 100

  let currentPage = 1
  let done = false
  // let counter = 0

  await clearStore('customers')

  while (!done) {
    const { status, result, page, pages } = await get(`customer?page=${currentPage++}&per_page=${perPage}`)
    if (status !== 200) return self.errorMessage('refreshCustomersListError')
    done = page >= pages

    for (const customer of result) {
      // self.postDebugMessage({ num: counter++, customer: customer.address })
      const { _id } = customer
      const { status } = await putRecordByKey('customers', _id, customer)

      // updateStatistics(_id, customer.services)

      if (status !== 200) return self.errorMessage('refreshCustomersListError')
    }
  }

  self.lastRequestTime = Date.now()

  // updatesController.setLastRequestDate(Date.now())

  return { status: 200, route, action, result: (await self.getAllCustomers()).result }
}
