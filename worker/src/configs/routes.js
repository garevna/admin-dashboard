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
  settingsController,
  updatesController
} = require('../controllers').default

export const routes = {
  '*': {
    refresh: async () => {
      const actions = [
        self.refreshServicesList,
        self.getResellersFromRemoteServer,
        self.getTicketsFromRemoteServer,
        self.refreshDocumentsList,
        self.downloadAllCustomers
      ]

      const response = await self.refreshSettings()

      self.postMessage(Object.assign(response, { action: 'initial-refresh' }))

      for (const action of actions) {
        action().then(response => self.postMessage(Object.assign(response, { action: 'initial-refresh' })))
      }

      self.downloadAllCustomers().then(response => {
        self.postMessage(Object.assign(response, { action: 'initial-refresh' }))
        self.refreshSchedule()
          .then(response => {
            self.postMessage(Object.assign(response, { action: 'initial-refresh' }))
          })
      })
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
    // refresh: customersController.refresh,
    refresh: customersController.getCustomersFromRemote,
    pagination: customersController.refreshByPageNumber,
    list: customersController.getAllCustomers,
    'short-list': customersController.getShortListOfCustomers,
    'filtered-short-list': customersController.getFilteredShortListOfCustomers,
    get: customersController.getCustomer,
    post: customersController.createCustomer,
    put: customersController.updateCustomer,
    patch: customersController.patchCustomer,
    delete: customersController.deleteCustomer,

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
    names: servicesController.names,
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
    pending: ticketsController.pending,
    archived: ticketsController.archived,
    details: ticketsController.getArchivedTicketDetails,
    rsp: ticketsController.listForPartner,
    get: ticketsController.get,
    put: ticketsController.put
  },

  // categories: {
  //   get: ticketsController.getCategories,
  //   put: ticketsController.putCategories
  // },

  schedule: {
    refresh: scheduleController.refresh,
    get: scheduleController.getFullSchedule,
    week: scheduleController.getByWeekNumber,
    update: scheduleController.updateRecord,
    // settings: scheduleController.getScheduleSettings,
    config: scheduleController.updateScheduleSettings,
    job: scheduleController.putRecordToJobQueue,
    activate: scheduleController.activateService,
    pending: scheduleController.getPendingRequests
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
  },

  updates: {
    customers: updatesController.getCustomerUpdates,
    tickets: updatesController.getTicketUpdates,
    schedule: updatesController.getScheduleUpdates,
    get: updatesController.getLastUpdates
  }
}
