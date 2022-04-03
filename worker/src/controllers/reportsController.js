class ReportsController {
  async createReport (request) {
    self.postMessage(await self.createReport(request.list))
  }

  async calculateReport () {
    self.postMessage(await self.calculateReport())
  }
}

export const reportsController = new ReportsController()
