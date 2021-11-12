const {
  authController,
  cryptoController,
  buildingController,
  rspController,
  customersController,
  servicesController,
  ticketsController,
  scheduleController,
  documentsController,
  settingsController
} = require('../controllers').default

export const routes = {
  '*': {
    refresh: () => {
      settingsController.refresh()
      rspController.refresh()
      servicesController.refresh()
      ticketsController.refresh()
      customersController.refresh()
      documentsController.refresh()
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
    post: buildingController.post,
    patch: buildingController.patch,
    delete: buildingController.delete,
    excel: buildingController.excel
  },

  rsp: {
    refresh: rspController.refresh,
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

    'get-messages': rspController.getMessagesByResellerId,
    'send-message': rspController.sendMessage,
    'delete-message': rspController.deleteMessage,
    'get-unique-code-list': rspController.getUniqueCodeList
  },

  customers: {
    refresh: customersController.refresh,
    pagination: customersController.refreshByPageNumber,
    list: customersController.getAllCustomers,
    'short-list': customersController.getShortListOfCustomers,
    'filtered-short-list': customersController.getFilteredShortListOfCustomers,
    get: customersController.getCustomer,
    post: customersController.createCustomer,
    delete: customersController.deleteCustomer,
    put: customersController.updateCustomer,

    excel: customersController.getCustomersForExcel,

    'hard-refresh': customersController.hardRefresh
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
    patch: servicesController.patch,
    delete: servicesController.deleteService
  },

  sla: {
    list: servicesController.getSLAList,
    get: servicesController.getSLAContent,
    put: servicesController.updateSLA,
    update: servicesController.updateSLA,
    upload: servicesController.uploadSLA,
    create: servicesController.createNewSLA,
    post: servicesController.uploadNewSLA,
    remove: servicesController.removeSLA,
    read: servicesController.readLocalFile
  },

  tickets: {
    refresh: ticketsController.refresh,
    list: ticketsController.list,
    archived: ticketsController.archived,
    details: ticketsController.getArchivedTicketDetails,
    rsp: ticketsController.listForPartner,
    get: ticketsController.get,
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
    // settings: scheduleController.getScheduleSettings,
    config: scheduleController.updateScheduleSettings,
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
  },

  documents: {
    refresh: documentsController.refresh,
    folders: documentsController.folders,
    list: documentsController.list,
    dir: documentsController.folderContent,
    rsp: documentsController.listForPartner,
    get: documentsController.get,
    read: documentsController.read,
    post: documentsController.post,
    update: documentsController.update,
    patch: documentsController.patch
  },

  settings: {
    refresh: settingsController.refresh,
    get: settingsController.get,
    update: settingsController.update
  }
}
