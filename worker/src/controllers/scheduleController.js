class ScheduleController {
  async refresh () {
    self.postMessage(await self.refreshSchedule())
  }

  async getBookingList () {
    self.postMessage(await self.getBooking())
  }

  async getFullSchedule () {
    self.postMessage(await self.buildSchedule())
  }

  async getLots () {
    self.postMessage(await self.getScheduleLots())
  }

  async updateLots (data) {
    self.postMessage(await self.updateScheduleLots(data))
  }

  async updateRecord (record) {
    self.postMessage(await self.updateCustomerServiceStatus(record))
  }

  async putRecordToJobQueue (data) {
    self.postMessage(await self.moveRecordToJobQueue(data.request))
  }

  async activateService (data) {
    self.postMessage(await self.setRecordStatusActive(data.request))
  }
}

export const scheduleController = new ScheduleController()
