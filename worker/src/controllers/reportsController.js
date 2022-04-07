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
}

export const reportsController = new ReportsController()
