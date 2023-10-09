import { clearStore, iterateCustomers } from '../db'

const [route, action] = ['schedule', 'refresh']

export const refreshSchedule = async function () {
  clearStore('schedule')

  await iterateCustomers()

  return {
    status: 200,
    route,
    action,
    result: {
      booking: (await self.getBooking()).result,
      schedule: (await self.buildSchedule()).result
    }
  }
}
