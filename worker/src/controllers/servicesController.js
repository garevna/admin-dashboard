import { readLocalFile } from '../helpers/AJAX'

class ServicesController {
  async refresh () {
    self.postMessage(await self.refreshServicesList())
  }

  async list () {
    self.postMessage(await self.getServicesListFromLocalDb())
  }

  async table () {
    self.postMessage(await self.getServiceListForTable())
  }

  async shortList () {
    self.postMessage(await self.getServicesShortList())
  }

  async getPartnerServices (request) {
    self.postMessage(await self.getPartnerServices(request.partnerId))
  }

  async names () {
    self.postMessage(await self.getServiceNamesFromLocalDb())
  }

  async get (request) {
    self.postMessage(await self.getServiceDetails(request.key))
  }

  async search (request) {
    self.postMessage(await self.getServiceIdByServiceName(request.serviceName))
  }

  async partialSearch (request) {
    self.postMessage(await self.partialServiceSearch(request.searchString))
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
    self.postMessage(Object.assign(await readLocalFile(request.file), { route: 'files', action: 'read' }))
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

  async getPriceList (request) {
    self.postMessage(await self.getServicePrices())
  }

  async getDiscountList (request) {
    self.postMessage(await self.getServiceDiscounts())
  }

  async getSpeedList (request) {
    self.postMessage(await self.getServiceSpeeds())
  }

  async getTermsList (request) {
    self.postMessage(await self.getServiceTerms())
  }

  async getFilters (request) {
    const response = await self.getServiceFilters()

    // const { priceList, discountList, speedList, termsList } = response.result

    self.postMessage({
      status: 200,
      route: 'services',
      action: 'filters',
      result: response.result
    })
  }
}

export const servicesController = new ServicesController()
