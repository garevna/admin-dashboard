// import { get } from '../AJAX'
import { getScheduleByWeek } from '../db/schedule'

import { getServiceDetails } from '../services'
import { getCustomer } from '../customers'
import { updateStatus, refreshSchedule } from './'

export const getScheduleByWeekNumber = async function (week) {
  const [route, action] = ['schedule', 'get']

  let { status, result: records } = await getScheduleByWeek(week)

  if (status !== 200) {
    return {
      status,
      route,
      action,
      error: true,
      errorType: `Schedule: week ${week}`
    }
  }

  // self.postMessage({ status: 300, route, action, title: 'RESPONSE', result: records })

  records = records.filter(record => record.status !== 'Awaiting for connection' && record.status !== 'Awaiting for scheduling' && record.status !== 'Not connected')

  for (const record of records) {
    if ((record.status === 'Awaiting confirmation' || record.status === 'Awaiting for confirmation') && !record.lots.length) {
      const { status, result } = await updateStatus(record._id, { status: 'Awaiting for scheduling' })
      self.postMessage({ status: 300, route, action, title: 'CHANGE STATUS', result: { status, result } })
    }
  }

  await refreshSchedule()

  records = records.filter(record => record.status !== 'Awaiting for scheduling')

  // self.postMessage({ status: 300, route, action, title: 'FILTERED', result: records })

  for (const record of records) {
    const response = await getServiceDetails(record.serviceId)
    if (response.status !== 200) self.postMessage(response)
    else record.serviceName = response.result.serviceName

    const customer = await getCustomer(record.customerId)
    if (customer.status !== 200) self.postMessage(customer)
    else record.customer = customer.result
  }

  // self.postMessage({ status: 300, route, action, title: 'WITH DATA', result: records })

  return { status, route, action, result: records }
}
