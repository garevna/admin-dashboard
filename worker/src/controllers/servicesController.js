import { readLocalFile } from '../helpers/AJAX'

class ServicesController {
  async refresh (request) {
    self.postMessage(await self.refreshServicesList())
  }

  async list (request) {
    self.postMessage(await self.getServicesListFromLocalDb())
  }

  async names (request) {
    self.postMessage(await self.getServiceNamesFromLocalDb())
  }

  async get (request) {
    self.postMessage(await self.getServiceDetails(request.key))
  }

  async search (request) {
    self.postMessage(await self.getServiceIdByServiceName(request.serviceName))
  }

  async groupSearch (request) {
    self.postMessage(await self.getServicesByNames(request.serviceNames))
  }

  async createNewSLA (request) {
    self.postMessage(await self.createNewSLA(request.record))
  }

  async post (request) {
    self.postMessage(await self.createNewService(request.data))
  }

  async deleteService (request) {
    self.postMessage(await self.deleteService(request.key))
  }

  async put (request) {
    self.postMessage(await self.updateService(request.key, request.data))
  }

  async patch (request) {
    self.postMessage(await self.patchService(request.key, request.data))
  }

  async patchGroup (request) {
    self.postMessage(await self.patchServices(request.partnerId, request.data))
  }

  async readLocalFile (request) {
    self.postMessage(Object.assign(await readLocalFile(request.file), {
      route: 'sla',
      action: 'read'
    }))
  }

  async uploadSLA (request) {
    self.postMessage(await self.uploadSLA(request.id, request.title, request.file))
  }

  async uploadNewSLA (request) {
    self.postMessage(await self.uploadNewSLA(request.title, request.file))
  }

  async updateSLA (request) {
    self.postMessage(await self.updateSLA(request.record))
  }

  async removeSLA (request) {
    self.postMessage(await self.removeSLA(request._id))
  }

  async getSLAList () {
    self.postMessage(await self.getSLAList())
  }

  async getSLAContent (request) {
    self.postMessage(await self.getSLAContent(request.key))
  }
}

export const servicesController = new ServicesController()
