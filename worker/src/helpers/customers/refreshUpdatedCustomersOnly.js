import { get } from '../AJAX'
import { putRecords } from '../db'

const [route, action] = ['customers', 'updated']

export const refreshUpdatedCustomersOnly = async function () {
  const perPage = 500

  let currentPage = 1
  let done = false

  while (!done) {
    const { status, result, page, pages } = await get(`customer?changed=true&page=${currentPage++}&per_page=${perPage}`)
    if (status !== 200) return self.errorMessage('refreshCustomersListError')
    done = page >= pages

    console.log(result)

    const response = putRecords('customers', result)
    console.log(response)
  }

  return { status: 200, route, action, result: (await self.getAllCustomers()).result }
}
