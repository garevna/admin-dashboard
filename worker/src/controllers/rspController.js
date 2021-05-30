import {
  getFromRemoteServer,
  getResellersList,
  getResellerDetails,
  getRegistrationRequests,
  getRegistrationRequestDetails,
  confirmRegistrationRequest,
  rejectRegistrationRequest
} from '../helpers/rsp'

class ResellersController {
  async refresh () {
    self.postMessage(await getFromRemoteServer())
  }

  async list () {
    self.postMessage(await getResellersList())
  }

  async get (id) {
    self.postMessage(await getResellerDetails(id))
  }

  async registrationRequests () {
    self.postMessage(await getRegistrationRequests())
  }

  async registrationRequestDetails (id) {
    self.postMessage(await getRegistrationRequestDetails(id))
  }

  async confirmRegistration (id) {
    self.postMessage(await confirmRegistrationRequest(id))
  }

  async rejectRegistration (id) {
    self.postMessage(await rejectRegistrationRequest(id))
  }
}

export const rspController = new ResellersController()
