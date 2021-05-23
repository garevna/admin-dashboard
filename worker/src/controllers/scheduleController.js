import {
  refreshSchedule,
  getSchedule,
  // getScheduleByWeekNumber,
  updateSchedule
  // updateStatus
} from '../helpers/schedule'

import { getBooking } from '../helpers/db/schedule'

class ScheduleController {
  async refresh () {
    self.postMessage(await refreshSchedule())
  }

  async getBookingList () {
    self.postMessage(await getBooking())
  }

  async getFullSchedule () {
    self.postMessage(await getSchedule())
  }

  // async getByWeekNumber (request) {
  //   const { key: weekNumber } = request
  //   self.postMessage(await getScheduleByWeekNumber(weekNumber))
  // }

  async updateRecord (id, data) {
    self.postMessage(await updateSchedule(id, data))
  }
}

export const scheduleController = new ScheduleController()
