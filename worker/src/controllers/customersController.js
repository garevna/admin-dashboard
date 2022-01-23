class CustomersController {
  // async getFromRemote () {
  //   self.postMessage(await self.getCustomersFromRemote())
  // }

  async refresh () {
    self.getCustomersFromRemote()
    // self.postMessage(await self.refreshUpdatedCustomersOnly())
    self.postMessage(await self.refreshSchedule())
  }

  async refreshUpdatedCustomersOnly () {
    self.postMessage(await self.refreshUpdatedCustomersOnly())
  }

  async getAllCustomers () {
    self.postMessage(await self.getAllCustomers())
  }

  async getShortListOfCustomers () {
    self.postMessage(await self.getShortListOfCustomers())
  }

  async getFilteredShortListOfCustomers (request) {
    self.postMessage(await self.getFilteredShortListOfCustomers(request.filter))
  }

  async getCustomersByResellerId (request) {
    self.postMessage(await self.getCustomersByResellerId(request.resellerId))
  }

  async getCustomersByPageNumber (pageNumber) {
    self.postMessage(await self.getCustomersByPageNumber(pageNumber))
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

  async patchCustomer (request) {
    self.postMessage(await self.patchCustomer(request.key, request.data))
  }

  async createCustomer (request) {
    self.postMessage(await self.createCustomer(request.data))
  }

  async hardRefresh () {
    self.postMessage(await self.hardCustomersRefresh())
  }

  async getCustomersForExcel (request) {
    self.postMessage(await self.getCustomersForExcelTable(request.data))
  }
}

export const customersController = new CustomersController()
