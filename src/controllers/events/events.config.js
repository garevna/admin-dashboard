export const events = {
  admin: {
    redirect: 'auth-success',
    auth: 'auth-error',
    reset: 'reset-password',
    code: 'verification-code',
    change: 'password-change'
  },

  rsp: {
    refresh: 'rsp-refreshed',
    get: 'client-data-received',
    put: 'client-data-updated'
  },

  customers: {
    refresh: 'customers-refreshed',
    list: 'customers-list-received',
    get: 'customer-data-received',
    post: 'customer-created',
    put: 'customer-updated'
  },

  services: {
    refresh: 'services-refreshed',
    list: 'services-list-received',
    get: 'service-data-received',
    put: 'service-data-updated',
    post: 'new-service-created'
  },

  tickets: {
    refresh: 'tickets-refreshed',
    categories: 'categories-received',
    list: 'tickets-list-received',
    get: 'ticket-data-received',
    post: 'ticket-created',
    put: 'ticket-updated'
  },

  booking: {
    get: 'booking-requests-received'
  },

  schedule: {
    refresh: 'schedule-refreshed',
    get: 'schedule-week-data-received',
    put: 'schedule-week-data-updated'
  },

  documents: {
    refresh: 'documents-refreshed',
    folders: 'document-folders-list-received',
    list: 'documents-full-list-received',
    dir: 'documents-folder-content-received',
    rsp: 'documents-for-rsp-received',
    get: 'document-content-received',
    post: 'new-document-created',
    update: 'document-updated'
  }
}
