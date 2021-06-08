class ResellersController {
  async refresh () {
    self.postMessage(await self.getResellersFromRemoteServer())
  }

  async list () {
    self.postMessage(await self.getResellersList())
  }

  async get (id) {
    self.postMessage(await self.getResellerDetails(id))
  }

  async registrationRequests () {
    self.postMessage(await self.getRegistrationRequests())
  }

  async registrationRequestDetails (id) {
    self.postMessage(await self.getRegistrationRequestDetails(id))
  }

  async confirmRegistration (id) {
    self.postMessage(await self.confirmRegistrationRequest(id))
  }

  async rejectRegistration (id) {
    self.postMessage(await self.rejectRegistrationRequest(id))
  }
}

export const rspController = new ResellersController()
