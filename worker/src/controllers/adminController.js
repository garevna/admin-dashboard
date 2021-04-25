import {
  auth,
  passwordChange,
  passwordReset,
  sendPasswordResetCode,
  changePassword
} from '../helpers'

class AdminController {
  async auth () {
    self.postMessage(await auth())
  }

  async passwordChange (data) {
    self.postMessage(await passwordChange(data))
  }

  async passwordReset () {
    self.postMessage(await passwordReset())
  }

  async sendPasswordResetCode () {
    self.postMessage(await sendPasswordResetCode())
  }

  async changePassword (request) {
    self.postMessage({ status: 300, route: 'admin', action: 'changePassword', result: request.data })
    self.postMessage(await changePassword(request.data))
  }
}

export const adminController = new AdminController()
