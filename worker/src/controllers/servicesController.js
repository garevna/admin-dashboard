import {
  refreshServicesList,
  getServicesListFromLocalDb,
  getServiceDetails,
  createNewService,
  updateService
} from '../helpers/services'

class ServicesController {
  async refresh (request) {
    self.postMessage(await refreshServicesList())
  }

  async list (request) {
    self.postMessage(await getServicesListFromLocalDb())
  }

  async get (request) {
    self.postMessage(await getServiceDetails(request.key))
  }

  async post (request) {
    self.postMessage(await createNewService(request.data))
  }

  async put (request) {
    self.postMessage(await updateService(request.key, request.data))
  }
}

export const servicesController = new ServicesController()
