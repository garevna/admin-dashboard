const { customersController } = require('../../controllers').default

export const customers = {
  // refresh: customersController.refresh,
  refresh: customersController.getCustomersFromRemote,
  updated: customersController.refreshUpdatedCustomersOnly,
  pagination: customersController.refreshByPageNumber,
  list: customersController.getAllCustomers,
  'get-filtered-and-paginated': customersController.getCustomersWithPagination,
  engineering: customersController.getCustomersEngineeringData,
  'short-list': customersController.getShortListOfCustomers,
  'filtered-short-list': customersController.getFilteredShortListOfCustomers,
  search: customersController.search,
  'search-by-unique-code': customersController.searchByUniqueCode,

  get: customersController.getCustomer,
  post: customersController.createCustomer,
  save: customersController.saveCustomers,
  put: customersController.updateCustomer,
  patch: customersController.patchCustomer,
  'patch-group': customersController.patchCustomersGroupService,

  delete: customersController.deleteCustomer,
  'delete-group': customersController.deleteGroupOfCustomers,

  buildings: customersController.getBuildingsByAddressList,

  services: customersController.getCustomerServices,

  'cancelation-date': customersController.updateServiceCancelationDate,
  'suspension-date': customersController.updateServiceSuspensionDate,
  'resuming-date': customersController.updateServiceResumingDate,

  cancel: customersController.cancelService,
  suspend: customersController.suspendService,
  resume: customersController.resumeService,

  excel: customersController.getCustomersForExcel,
  export: customersController.exportToExcel,
  import: customersController.importCustomers,
  'import-updates': customersController.importCustomerUpdates,

  'hard-refresh': customersController.hardRefresh
}
