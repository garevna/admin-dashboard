const {
  authController,
  cryptoController,
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
      customersController.getFromRemote()
      servicesController.refresh()
      ticketsController.refresh()
      scheduleController.refresh()
    }
  },
  admin: {
    init: authController.init,
    auth: authController.auth,
    reset: authController.passwordReset,
    code: authController.sendPasswordResetCode,
    change: authController.changePassword
  },
  rsp: {
    refresh: rspController.refresh,
    list: rspController.list,
    get: rspController.get,
    registration: rspController.registrationRequests,
    confirm: rspController.confirmRegistration,
    reject: rspController.rejectRegistration,
    'registration-request-details': rspController.registrationRequestDetails
  },
  customers: {
    refresh: customersController.getFromRemote,
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
    put: servicesController.put
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
