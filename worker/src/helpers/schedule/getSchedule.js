// import { get } from '../AJAX'
import { getAllSchedule } from '../db/schedule'

import { getServiceDetails } from '../services'
import { getCustomer } from '../customers'

// const notAvailable = ['Awaiting for connection', 'Awaiting for scheduling', 'Not connected']
const available = ['Awaiting for confirmation', 'Awaiting confirmation', 'In job queue']

export const getSchedule = async function () {
  const [route, action] = ['schedule', 'get']

  const response = await getAllSchedule()

  // self.postMessage({ status: 300, route, action, title: 'RESPONSE', result: response })

  if (response.status !== 200) return response

  const records = response.result.filter(record => available.includes(record.status))

  // self.postMessage({ status: 300, route, action, title: 'FILTERED', records })

  for (const record of records) {
    const response = await getServiceDetails(record.serviceId)
    if (response.status !== 200) self.postMessage(response)
    else record.serviceName = response.result.serviceName

    const customer = await getCustomer(record.customerId)
    if (customer.status !== 200) self.postMessage(customer)
    else record.customer = customer.result
  }

  // self.postMessage({ status: 300, route, action, title: 'WITH DATA', result: records })

  return { status: 200, route, action, result: records }
}
