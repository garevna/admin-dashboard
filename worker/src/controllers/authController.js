import {
  init,
  auth,
  passwordReset,
  sendPasswordResetCode,
  changePassword
} from '../helpers'

class AuthController {
  init (request) {
    self.postMessage({ status: 300, controller: 'authController', request })
    self.postMessage(init(request))
  }

  async auth (request) {
    self.postMessage(await auth(request.login, request.password))
  }

  async passwordReset (request) {
    self.postMessage(await passwordReset(request.login))
  }

  async sendPasswordResetCode (request) {
    self.postMessage(await sendPasswordResetCode(request.code))
  }

  async changePassword (request) {
    self.postMessage(await changePassword(request.password))
  }
}

export const authController = new AuthController()
