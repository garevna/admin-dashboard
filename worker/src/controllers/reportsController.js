class ReportsController {
  async createReport (request) {
    self.postMessage(await self.createReport(request.list))
  }

  async calculateReport () {
    self.postMessage(await self.calculateReport())
  }

  async getOverview () {
    self.postMessage(await self.getReportsOverview())
  }

  async getLocations () {
    self.postMessage(await self.getLocations())
  }

  async getRecord (request) {
    self.postMessage(await self.getRecord(request.recordId))
  }
}

export const reportsController = new ReportsController()
