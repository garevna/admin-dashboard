class CustomersController {
  async getFromRemote () {
    self.postMessage(await self.getCustomersFromRemoteServer())
  }

  async refreshByPageNumber (pageNumber) {
    self.postMessage(await self.refreshWithPagination(pageNumber))
  }

  async getAllCustomers () {
    self.postMessage(await self.getAllCustomers())
  }

  async getCustomer (request) {
    self.postMessage(await self.getCustomer(request.key))
  }

  async deleteCustomer (request) {
    self.postMessage(await self.deleteCustomer(request.key))
  }

  async updateCustomer (request) {
    self.postMessage(await self.updateCustomer(request.key, request.data))
  }

  async createCustomer (request) {
    self.postMessage(await self.createCustomer(request.data))
  }
}

export const customersController = new CustomersController()
