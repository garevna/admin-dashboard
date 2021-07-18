const {
  authController,
  cryptoController,
  buildingController,
  rspController,
  customersController,
  servicesController,
  ticketsController,
  scheduleController
} = require('../controllers').default

export const routes = {
  '*': {
    refresh: () => {
      rspController.refresh()
      servicesController.refresh()
      ticketsController.refresh()
      customersController.refresh()
    }
  },
  admin: {
    init: authController.init,
    auth: authController.auth,
    reset: authController.passwordReset,
    code: authController.sendPasswordResetCode,
    change: authController.changePassword
  },

  building: {
    patch: buildingController.patch
  },

  rsp: {
    refresh: rspController.refresh,
    list: rspController.list,
    short: rspController.short,
    get: rspController.get,

    'refresh-partners-list': rspController.refreshPartnersList,

    registration: rspController.registrationRequests,
    reject: rspController.rejectRegistration,
    'refresh-registration-requests': rspController.refreshRegistration,
    'registration-request-details': rspController.registrationRequestDetails,
    'confirm-registration-request': rspController.confirmRegistration,

    customers: customersController.getCustomersByResellerId,

    'get-messages': rspController.getMessagesByResellerId,
    'send-message': rspController.sendMessage,
    'delete-message': rspController.deleteMessage,
    'get-unique-code-list': rspController.getUniqueCodeList
  },

  customers: {
    refresh: customersController.refresh,
    pagination: customersController.refreshByPageNumber,
    list: customersController.getAllCustomers,
    get: customersController.getCustomer,
    post: customersController.createCustomer,
    delete: customersController.deleteCustomer,
    put: customersController.updateCustomer
  },

  crypto: {
    init: cryptoController.init,
    encrypt: cryptoController.encrypt,
    decrypt: cryptoController.decrypt
  },

  services: {
    refresh: servicesController.refresh,
    list: servicesController.list,
    get: servicesController.get,
    post: servicesController.post,
    put: servicesController.put,
    patch: servicesController.patch
  },

  sla: {
    list: servicesController.getSLAList,
    get: servicesController.getSLAContent,
    put: servicesController.updateSLA,
    update: servicesController.updateSLA,
    upload: servicesController.uploadSLA,
    post: servicesController.uploadNewSLA,
    read: servicesController.readLocalFile
  },

  tickets: {
    refresh: ticketsController.refresh,
    list: ticketsController.list,
    get: ticketsController.get,
    post: ticketsController.post,
    put: ticketsController.put
  },
  categories: {
    get: ticketsController.getCategories,
    put: ticketsController.putCategories
  },
  schedule: {
    refresh: scheduleController.refresh,
    get: scheduleController.getFullSchedule,
    week: scheduleController.getByWeekNumber,
    update: scheduleController.updateRecord,
    job: scheduleController.putRecordToJobQueue,
    activate: scheduleController.activateService
  },
  booking: {
    get: scheduleController.getBookingList,
    update: scheduleController.updateRecord
  },
  lots: {
    get: scheduleController.getLots,
    update: scheduleController.updateLots
  }
}
