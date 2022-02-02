import { get } from '../AJAX'
import { putRecordByKey } from '../db'

// import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'customers']

// const remoteError = Object.assign(remoteServerError, { route, action })

export const getCustomerUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  let promises = notifications
    .filter(item => item.target === 'customer')
    .map(note => note.id)
    .map(id => get(`customer/${id}`))

  const responses = await Promise.all(promises)

  const customers = responses.map(response => response.result)

  promises = customers.map(customer => putRecordByKey('customers', customer._id, customer))

  await Promise.all(promises)

  await self.refreshSchedule()

  return { status: 200, route, action, result: customers }
}
