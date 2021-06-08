import { get } from '../AJAX'
import { /* clearStore, */ putRecordByKey } from '../db'

const { refreshCustomersListError, refreshUsersError } = require('../error-handlers').default

export const refreshWithPagination = async function () {
  const [route, action] = ['customers', 'pagination']

  const response = await self.getResellersList()

  if (response.status !== 200) return refreshUsersError(response.status)

  for (const rsp of response.result) {
    let currentPage = 0
    let done = false
    while (!done) {
      const { status, result } = await get(`customer/admin/${rsp._id}?skip=${currentPage++ * 30}&limit=30`)
      if (status !== 200) return refreshCustomersListError(status)

      done = result.length < 30

      for (const customer of result) {
        const { _id } = customer
        const { status } = await putRecordByKey('customers', _id, customer)
        if (status !== 200) return refreshCustomersListError(status)
      }
    }
  }

  return { status: 200, route, action, result: 'OK' }
}
