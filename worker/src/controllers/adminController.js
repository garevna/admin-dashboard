const {
  auth,
  passwordChange,
  passwordReset,
  sendPasswordResetCode,
  changePassword
} = require('../helpers').default

class AdminController {
  async auth (request) {
    self.postMessage(await auth(request.login, request.password))
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

  async getAdmins () {
    self.postMessage(await self.getAdmins())
  }

  async createAdmin (request) {
    self.postMessage(await self.createAdmin(request.data))
  }

  async getAdminDetails (request) {
    self.postMessage(await self.getUserDetails(request.id))
  }

  async updateAdmin (request) {
    self.postMessage(await self.updateAdmin(request.data))
  }

  async removeAdmin (request) {
    self.postMessage(await self.deleteUser(request.id))
  }
}

export const adminController = new AdminController()
