class ServicesController {
  async refresh (request) {
    self.postMessage(await self.refreshServicesList())
  }

  async list (request) {
    self.postMessage(await self.getServicesListFromLocalDb())
  }

  async get (request) {
    self.postMessage(await self.getServiceDetails(request.key))
  }

  async post (request) {
    self.postMessage(await self.createNewService(request.data))
  }

  async put (request) {
    self.postMessage(await self.updateService(request))
  }

  async uploadSLA (request) {
    self.postDebugMessage({ request })
    self.postMessage(await self.uploadSLA(request.title, request.file))
  }

  async updateSLA (request) {
    self.postDebugMessage({ method: 'updateSLA', request })
    self.postMessage(await self.updateSLA(request.record))
  }

  async getSLAList () {
    self.postMessage(await self.getSLAList())
  }

  async getSLAContent (request) {
    self.postMessage(await self.getSLAContent(request.key))
  }
}

export const servicesController = new ServicesController()
