import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

export const refreshWithPagination = async function () {
  const [route, action] = ['customers', 'refresh']

  const response = await self.getResellersList()

  if (response.status !== 200) return self.errorMessage('refreshUsersError')

  clearStore('customers')

  const limit = 30

  for (const rsp of response.result) {
    let currentPage = 0
    let done = false
    while (!done) {
      const { status, result } = await get(`customer/admin/${rsp._id}?skip=${currentPage++ * limit}&limit=${limit}`)
      if (status !== 200) return self.errorMessage('refreshCustomersListError')

      done = result.length < limit

      for (const customer of result) {
        const { _id } = customer
        const { status } = await putRecordByKey('customers', _id, customer)
        if (status !== 200) return self.errorMessage('refreshCustomersListError')
      }
    }
  }

  return { status: 200, route, action, result: 'OK' }
}
