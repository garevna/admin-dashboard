import {
  getFromRemoteServer,
  getResellersList,
  getResellerDetails
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
}

export const rspController = new ResellersController()
