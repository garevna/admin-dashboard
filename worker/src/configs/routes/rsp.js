const { rspController, customersController } = require('../../controllers').default

export const rsp = {
  refresh: rspController.refresh,
  create: rspController.create,
  list: rspController.list,
  short: rspController.short,
  get: rspController.get,
  credentials: rspController.getPartnerCredentials,

  'refresh-partners-list': rspController.refreshPartnersList,

  registration: rspController.registrationRequests,
  reject: rspController.rejectRegistration,
  'refresh-registration-requests': rspController.refreshRegistration,
  'registration-request-details': rspController.registrationRequestDetails,
  'confirm-registration-request': rspController.confirmRegistration,

  customers: customersController.getCustomersByResellerId,

  'get-unique-code-list': rspController.getUniqueCodeList
}
