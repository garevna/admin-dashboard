const {
  auth,
  passwordChange,
  passwordReset,
  sendPasswordResetCode,
  changePassword
} = require('../helpers').default

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
    self.postMessage(await changePassword(request.data))
  }
}

export const adminController = new AdminController()
