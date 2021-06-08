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
    self.postMessage(await self.updateService(request.key, request.data))
  }
}

export const servicesController = new ServicesController()
