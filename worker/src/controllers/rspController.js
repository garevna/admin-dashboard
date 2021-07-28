import { uniqueCodes } from '../helpers/data-handlers'

class ResellersController {
  async refresh () {
    self.postMessage(await self.getResellersFromRemoteServer())
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

  async get (id) {
    self.postMessage(await self.getResellerDetails(id))
  }

  async registrationRequests () {
    self.postMessage(await self.getRegistrationRequests())
  }

  async refreshRegistration () {
    self.postMessage(await self.refreshRegistrationRequestsList())
  }

  async registrationRequestDetails (id) {
    self.postMessage(await self.getRegistrationRequestDetails(id))
  }

  async confirmRegistration (request) {
    const { id, uniqueCode } = request.data
    self.postMessage(await self.confirmRegistrationRequest(id, uniqueCode))
  }

  async rejectRegistration (id) {
    self.postMessage(await self.rejectRegistrationRequest(id))
  }

  async sendMessage (request) {
    self.postMessage(await self.sendMessage(request.message))
  }

  async getMessagesByResellerId (request) {
    self.postMessage(await self.getMessages(request.resellerId))
  }

  async deleteMessage (messageId) {
    self.postMessage(await self.deleteMessage(messageId))
  }

  getUniqueCodeList () {
    self.postMessage({ status: 200, route: 'rsp', action: 'get-unique-code-list', result: uniqueCodes() })
  }
}

export const rspController = new ResellersController()
