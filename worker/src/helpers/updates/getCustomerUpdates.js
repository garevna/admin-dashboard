import { get } from '../AJAX/get'
import { putRecordByKey } from '../db'

import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'customers']
const remoteError = Object.assign(remoteServerError, { route, action })

export const getCustomerUpdates = async () => {
  let currentPage = 1
  const updates = []
  do {
    const { status, pages, result } = await get(`customer?changed=true&per_page=50&page=${currentPage++}`)
    if (status !== 200) return remoteError
    var done = currentPage > pages || !result || !result.length
    updates.push(...result)
  } while (!done)

  await Promise.all(updates.map(customer => putRecordByKey('customers', customer._id, customer)))

  self.lastRequestTime = Date.now()

  return { status: 200, route, action, result: updates.length }
}
