import {
  createCustomer,
  saveCustomers,

  getAllCustomers,
  getCustomer,
  getCustomersEngineeringData,
  getShortListOfCustomers,
  getFilteredShortListOfCustomers,
  getCustomersByResellerId,
  getCustomersByPageNumber,
  getCustomersForExcel,
  getCustomerServices,

  searchByUniqueCode,
  search,
  importCustomerUpdates,

  updateCustomer,
  patchCustomer,
  patchCustomersGroupService,
  updateServiceCancelationDate,
  updateServiceSuspensionDate,
  updateServiceResumingDate,

  deleteCustomer,
  deleteGroupOfCustomers,

  refresh,
  hardRefresh,
  refreshUpdatedCustomersOnly
} from './customers-controller-helpers'

class CustomersController {
  async getBuildingsByAddressList (request) {
    self.getBuildingsByAddressList(request.addressList)
  }

  async importCustomers (request) {
    const { status, result } = await self.importCustomers(request.file, request.resellerId || null)

    self.postMessage({ route: 'customers', action: 'import', status, result })
  }

  exportToExcel (request) {
    self.exportToExcel(request.options)
  }

  async getCustomersWithPagination (request) {
    self.postMessage(await self.getCustomersWithPagination(request.filters, request.page, request.customersPerPage))
  }
}

Object.assign(CustomersController.prototype, {
  createCustomer,
  saveCustomers,

  getAllCustomers,
  getCustomer,
  getCustomersEngineeringData,
  getShortListOfCustomers,
  getFilteredShortListOfCustomers,
  getCustomersByResellerId,
  getCustomersByPageNumber,
  getCustomersForExcel,
  getCustomerServices,

  searchByUniqueCode,
  search,
  importCustomerUpdates,

  updateCustomer,
  patchCustomer,
  patchCustomersGroupService,
  updateServiceCancelationDate,
  updateServiceSuspensionDate,
  updateServiceResumingDate,

  deleteCustomer,
  deleteGroupOfCustomers,

  refresh,
  hardRefresh,
  refreshUpdatedCustomersOnly
})

export const customersController = new CustomersController()
