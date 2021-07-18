import { readLocalFile } from '../helpers/AJAX'

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

  async patch (request) {
    self.postMessage(await self.patchService(request.key, request.data))
  }

  async readLocalFile (request) {
    self.postMessage(Object.assign(await readLocalFile(request.file), {
      route: 'sla',
      action: 'read'
    }))
  }

  async uploadSLA (request) {
    self.postDebugMessage({ request })
    self.postMessage(await self.uploadSLA(request.id, request.title, request.file))
  }

  async uploadNewSLA (request) {
    self.postDebugMessage({ request })
    self.postMessage(await self.uploadNewSLA(request.title, request.file))
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
