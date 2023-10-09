const remoteServerError = 'Error reading the data from remote server'
const localDbError = 'Error reading the data from local DB'

export const adminWorkerErrors = {
  rsp: {
    refresh: {
      errorType: 'RSP',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'RSP list',
      errorMessage: localDbError
    },
    get: {
      errorType: 'RSP Details',
      errorMessage: localDbError
    },
    put: {
      errorType: 'RSP details',
      errorMessage: 'Data was not updated'
    }
  },
  customers: {
    refresh: {
      errorType: 'Customers',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Customers',
      errorMessage: localDbError
    },
    get: {
      errorType: 'Customer details',
      errorMessage: localDbError
    },
    put: {
      errorType: 'Customer details',
      errorMessage: 'Data was not updated'
    }
  },
  tickets: {
    refresh: {
      errorType: 'Tickets',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Tickets list',
      errorMessage: localDbError
    },
    get: {
      errorType: 'Ticket details',
      errorMessage: localDbError
    }
  },
  categories: {
    get: {
      errorType: 'Ticket categories',
      errorMessage: localDbError
    },
    put: {
      errorType: 'Ticket categories',
      errorMessage: 'Data was not updated'
    }
  },
  services: {
    refresh: {
      errorType: 'Services',
      errorMessage: remoteServerError
    },
    list: {
      errorType: 'Services list',
      errorMessage: localDbError
    },
    get: {
      errorType: 'Service details',
      errorMessage: localDbError
    },
    put: {
      errorType: 'Service details',
      errorMessage: 'Data was not updated'
    },
    post: {
      errorType: 'Services',
      errorMessage: 'New service creation failed'
    }
  }
}
