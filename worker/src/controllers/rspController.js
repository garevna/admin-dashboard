import { uniqueCodes } from '../helpers/data-handlers'

class ResellersController {
  async refresh () {
    self.postMessage(await self.getResellersFromRemoteServer())
  }

  async create (request) {
    self.postMessage(await self.createPartner(request.data))
  }

  async refreshPartnersList () {
    self.postMessage(await self.refreshPartnersList())
  }

  async list () {
    self.postMessage(await self.getResellersList())
  }

  async short () {
    self.postMessage(await self.getResellersShortList())
  }

  async get (request) {
    self.postMessage(await self.getResellerDetails(request.data))
  }

  async registrationRequests () {
    self.postMessage(await self.getRegistrationRequests())
  }

  async refreshRegistration () {
    self.postMessage(await self.refreshRegistrationRequestsList())
  }

  async registrationRequestDetails (request) {
    self.postMessage(await self.getRegistrationRequestDetails(request.id))
  }

  async confirmRegistration (request) {
    const { id, uniqueCode } = request.data
    self.postMessage(await self.confirmRegistrationRequest(id, uniqueCode))
  }

  async rejectRegistration (request) {
    self.postMessage(await self.rejectRegistrationRequest(request.id))
  }

  // async sendMessage (request) {
  //   self.postMessage(await self.sendMessage(request.message))
  // }

  // async updateMessage (request) {
  //   self.postMessage(await self.patchMessage(request.messageId, request.data))
  // }

  // async getMessagesByResellerId (request) {
  //   self.postMessage(await self.getMessages(request.resellerId))
  // }

  // async deleteMessage (request) {
  //   self.postMessage(await self.deleteMessage(request.messageId))
  // }

  async getPartnerCredentials (request) {
    self.postMessage(await self.getPartnerCredentials(request.resellerId))
  }

  getUniqueCodeList () {
    self.postMessage({ status: 200, route: 'rsp', action: 'get-unique-code-list', result: uniqueCodes() })
  }
}

export const rspController = new ResellersController()
