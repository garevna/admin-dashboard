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

  async updateLots () {
    self.postMessage(await self.updateScheduleLots())
  }

  // async getScheduleSettings () {
  //   self.postMessage(await self.getScheduleSettings())
  // }

  // async updateScheduleSettings (record) {
  //   self.postMessage(await self.updateScheduleSettings(record.settings))
  // }

  async updateRecord (record) {
    self.postMessage(Object.assign(await self.updateCustomerServiceStatus(record), {
      route: 'booking',
      action: 'update'
    }))
  }

  async putRecordToJobQueue (data) {
    self.postMessage(await self.moveRecordToJobQueue(data.request))
  }

  async activateService (data) {
    self.postMessage(await self.setRecordStatusActive(data.request))
  }
}

export const scheduleController = new ScheduleController()
