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

  async getLotsFromRemote () {
    self.postMessage(await self.getScheduleLots())
  }

  async updateLotsToCurrentDate () {
    self.postMessage(await self.updateScheduleLots())
  }

  async createNewScheduleLot (request) {
    self.postMessage(await self.createNewScheduleLot(request.date, request.period))
  }

  async getPendingRequests () {
    self.postMessage(await self.getPendingRequests())
  }

  async updateRecord (record) {
    const request = record.data ? record.data : record
    self.postMessage(Object.assign(await self.updateCustomerServiceStatus(request), {
      route: 'booking',
      action: 'update'
    }))
  }

  async putRecordToJobQueue (data) {
    self.postMessage(await self.moveRecordToJobQueue(data.request))
  }

  async activateService (request) {
    self.postMessage(await self.setRecordStatusActive(request.record))
  }
}

export const scheduleController = new ScheduleController()
