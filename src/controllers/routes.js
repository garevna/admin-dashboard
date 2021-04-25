import * as actions from './actions'

export const routes = {
  admin: {
    auth: {
      method: actions.auth,
      resolveEvent: 'auth-success',
      rejectEvent: 'auth-failure'
    },
    resetPassword: {
      resolveEvent: 'reset-success',
      rejectEvent: 'reset-failure'
    }
  },
  customers: {
    refresh: {
      method: actions.refreshCustomers,
      events: {
        resolve: 'customers-list-refreshed',
        reject: 'customers-list-refreshed-failure'
      }
    },
    list: {
      method: actions.getCustomers,
      events: {
        resolve: 'customers-list-received',
        reject: 'customers-list-failure'
      }
    },
    get: {
      method: actions.getCustomerData,
      events: {
        resolve: 'customer-details-received',
        reject: 'customers-details-failure'
      }
    },
    post: {
      events: {
        resolve: 'customer-created-success',
        reject: 'customer-created-failure'
      }
    }
  }
}
