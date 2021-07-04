import { clearStore, iterateCustomers } from '../db'

export const refreshSchedule = async function () {
  clearStore('schedule')

  await iterateCustomers()

  return {
    status: 200,
    route: 'schedule',
    action: 'refresh',
    result: {
      booking: (await self.getBooking()).result,
      schedule: (await self.buildSchedule()).result
    }
  }
}
