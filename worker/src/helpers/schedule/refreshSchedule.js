import { get } from '../AJAX'
import { clearStore } from '../db'

const { refreshScheduleError } = require('../error-handlers').default

export const refreshSchedule = async function () {
  const [route, action] = ['schedule', 'refresh']

  clearStore('schedule')

  const { status, result } = await get('scheduling')

  if (status !== 200) return refreshScheduleError(status)

  const promises = result.map(record => self.buildScheduleRecord(record))

  await Promise.all(promises)

  return {
    status: 200,
    route,
    action,
    result: {
      booking: (await self.getBooking()).result,
      schedule: (await self.getSchedule()).result
    }
  }
}
