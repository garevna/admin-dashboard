import {
  refreshSchedule,
  getBooking,
  getSchedule,
  getScheduleLots,
  updateScheduleRecord,
  updateScheduleLots,
  moveRecordToJobQueue,
  setRecordStatusActive
} from '../helpers/schedule'

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

  async getLots () {
    self.postMessage(await getScheduleLots())
  }

  async updateLots (data) {
    self.postMessage(await updateScheduleLots(data))
  }

  // async getByWeekNumber (request) {
  //   const { key: weekNumber } = request
  //   self.postMessage(await getScheduleByWeekNumber(weekNumber))
  // }

  async updateRecord (record) {
    self.postMessage(await updateScheduleRecord(record))
  }

  async putRecordToJobQueue (record) {
    self.postMessage(await moveRecordToJobQueue(record))
  }

  async activateService (data) {
    self.postMessage(await setRecordStatusActive(data.request))
  }
}

export const scheduleController = new ScheduleController()
