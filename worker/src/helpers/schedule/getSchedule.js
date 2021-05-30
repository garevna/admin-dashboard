import { getAllSchedule } from '../db/schedule'

import { getServiceDetails } from '../services'
import { getCustomer } from '../customers'

import { refreshSchedule } from './'

// const notAvailable = ['Awaiting for connection', 'Awaiting for scheduling', 'Not connected']
const available = ['Awaiting for confirmation', 'Awaiting confirmation', 'In job queue']

export const getSchedule = async function () {
  const [route, action] = ['schedule', 'get']

  let response = await getAllSchedule()

  if (response.status !== 200) {
    const refresh = await refreshSchedule()
    if (response.status !== 200) return refresh
    response = refresh.result
  }

  const records = response.result.filter(record => available.includes(record.status))

  const dates = records.flatMap(record => record.status === 'In job queue' ? [record.installation.date] : [record.lots[0].date, record.lots[1].date])

  const weeks = Object.assign({}, ...Array.from(new Set(dates.map(date => self.getWeekNumber(date))))
    .map(number => ({ [number]: self.getWeekDatesByWeekNumber(number).reduce((accum, date) => Object.assign(accum, { [date]: { am: [], pm: [], afterhours: [] } }), {}) })))

  for (const record of records) {
    const response = await getServiceDetails(record.serviceId)
    if (response.status !== 200) self.postMessage(response)
    else record.serviceName = response.result.serviceName

    const customer = await getCustomer(record.customerId)
    if (customer.status !== 200) self.postMessage(customer)
    else record.customer = customer.result

    const weekNumbers = record.status === 'In job queue' ? [self.getWeekNumber(record.installation.date)]
      : [self.getWeekNumber(record.lots[0].date), self.getWeekNumber(record.lots[1].date)]
    const dates = record.status === 'In job queue' ? [record.installation.date]
      : [record.lots[0].date, record.lots[1].date]
    const periods = record.status === 'In job queue' ? [record.installation.period]
      : [record.lots[0].period, record.lots[1].period]

    weekNumbers.forEach((number, index) => {
      weeks[number][dates[index]][periods[index]].push(record)
    })
  }

  return { status: 200, route, action, result: weeks }
}
