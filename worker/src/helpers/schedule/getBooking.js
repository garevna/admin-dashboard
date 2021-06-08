// import { get } from '../AJAX'
import { getAllSchedule } from '../db/schedule'

// import { getServiceDetails } from '../services'
// import { getCustomer } from '../customers'

const available = ['Awaiting for connection', 'Awaiting for scheduling', 'Not connected', 'Unable to connect']
// const available = ['Awaiting for confirmation', 'Awaiting confirmation', 'In job queue']

export const getBooking = async function () {
  const [route, action] = ['booking', 'get']

  const response = await getAllSchedule()

  // self.postMessage({ status: 300, route, action, title: 'ALL SCHEDULE', result: response })

  if (response.status !== 200) return response

  const records = response.result.filter(record => available.includes(record.status))

  // self.postMessage({ status: 300, route, action, title: 'FILTERED', records })

  const result = {}

  for (const record of records) {
    const response = await self.getServiceDetails(record.serviceId)
    if (response.status !== 200) self.postMessage(response)
    else record.serviceName = response.result.serviceName

    const customer = await self.getCustomer(record.customerId)
    if (customer.status !== 200) self.postMessage(customer)
    else record.customer = customer.result

    const date = new Date(record.modified).toDateString()
    if (!result[date]) result[date] = []
    result[date].push(record)
  }

  // self.postMessage({ status: 300, route, action, title: 'WITH DATA', result: records })

  return { status: 200, route, action, result }
}
