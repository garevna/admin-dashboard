import { get } from '../AJAX/get'
import { putRecordByKey, /* updateStatistics, */ iterateCustomers } from '../db'

import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'customers']
const remoteError = Object.assign(remoteServerError, { route, action })

export const getCustomerUpdates = async () => {
  if (Date.now() - self.lastRequestTime < self.frequency) return []
  let currentPage = 1
  const updates = []
  do {
    const { status, pages, result } = await get(`customer?changed=true&per_page=50&page=${currentPage++}`)
    if (status !== 200) return remoteError
    var done = currentPage > pages || !result || !result.length

    // self.postDebugMessage({ updatedCustomers: result })

    const promises = result.map(customer => putRecordByKey('customers', customer._id, customer))
    /* const response = */ await Promise.all(promises)

    // result.forEach(customer => updateStatistics(customer._id, customer.services))

    // self.postDebugMessage({ localCustomersUpdates: response })

    updates.push(...result)
  } while (!done)

  self.lastRequestTime = Date.now()

  iterateCustomers()

  return { status: 200, route, action, result: updates }
}
