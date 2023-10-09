class ReportsController {
  async createReport (request) {
    self.postMessage(await self.createReport(request.list))
  }

  async calculateReport () {
    self.postMessage(await self.calculateReport())
  }

  async calculatePartners () {
    self.postMessage(await self.calculatePartners())
  }

  async getOverview () {
    self.postMessage(await self.getReportsOverview())
  }

  async getPartnersOverview () {
    self.postMessage(await self.getPartnersOverview())
  }

  async getBuildingsByPostCode (request) {
    self.postMessage(await self.getRecordsByPostCode(request.postCode))
  }

  async getBuildingsOverview () {
    self.postMessage(await self.getBuildingsOverview())
  }

  async getLocations () {
    self.postMessage(await self.getLocations())
  }

  getLocationDynamicMRR (request) {
    self.postMessage(self.getLocationDynamic(request.location))
  }

  async getRecord (request) {
    self.postMessage(await self.getRecord(request.recordId))
  }

  async getPartnerData (request) {
    self.postMessage(await self.getPartnerData(request.partnerId))
  }
}

export const reportsController = new ReportsController()
