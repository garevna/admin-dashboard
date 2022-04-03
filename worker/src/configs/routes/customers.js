const { customersController } = require('../../controllers').default

export const customers = {
  // refresh: customersController.refresh,
  refresh: customersController.getCustomersFromRemote,
  updated: customersController.refreshUpdatedCustomersOnly,
  pagination: customersController.refreshByPageNumber,
  list: customersController.getAllCustomers,
  'short-list': customersController.getShortListOfCustomers,
  'filtered-short-list': customersController.getFilteredShortListOfCustomers,
  get: customersController.getCustomer,
  post: customersController.createCustomer,
  save: customersController.saveCustomers,
  put: customersController.updateCustomer,
  patch: customersController.patchCustomer,
  delete: customersController.deleteCustomer,

  services: customersController.getCustomerServices,

  'cancelation-date': customersController.updateServiceCancelationDate,
  'suspension-date': customersController.updateServiceSuspensionDate,
  'resuming-date': customersController.updateServiceResumingDate,

  cancel: customersController.cancelService,
  suspend: customersController.suspendService,
  resume: customersController.resumeService,

  excel: customersController.getCustomersForExcel,

  'hard-refresh': customersController.hardRefresh
}
