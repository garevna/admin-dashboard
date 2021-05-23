import { get } from '../AJAX'
import { clearStore } from '../db'
import { updateCustomerServiceStatus } from '../customers'
import { putScheduleRecord } from '../db/schedule'
import { refreshScheduleError } from '../error-handlers'

import { getWeekNumber } from 'garevna-date-functions'

const testStatus = async (record) => {
  const { customerId, serviceId, status, lots } = record
  if ((status === 'Awaiting confirmation' || status === 'Awaiting for confirmation') && !lots.length) {
    record.status = 'Awaiting for scheduling'
    self.postMessage(await updateCustomerServiceStatus(customerId, serviceId, record.status))
    // self.postMessage(await updateSchedule(customerId, serviceId, record.status))
  }
}

export const refreshSchedule = async function (week) {
  const [route, action] = ['schedule', 'refresh']

  if (week) {
    const { status, result } = await get(`scheduling/admin/${week}`)

    if (status !== 200) return refreshScheduleError(status, week)

    await testStatus(result)

    // self.postMessage({ status: 300, route, action, week, result })

    return { status: (await putScheduleRecord(result)).status, route, action, result }
  }

  const weekNumber = getWeekNumber(new Date())
  clearStore('schedule')

  for (const week of [weekNumber - 3, weekNumber - 2, weekNumber - 1, weekNumber, weekNumber + 1, weekNumber + 2]) {
    const { status, result } = await get(`scheduling/admin/${week}`)

    // self.postMessage({ status: 300, route, action, result: { status, week, result } })

    if (status !== 200) return refreshScheduleError(status, week)

    for (const record of result) {
      await putScheduleRecord(record)

      await testStatus(record)

      // self.postMessage({ status: 300, route, action, result: { status, record } })
    }
  }

  return { status: 200, route, action }
}
