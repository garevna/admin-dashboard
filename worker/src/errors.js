export const offline = {
  route: '*',
  action: '*',
  errorType: 'Offline mode',
  errorMessage: 'Operation failed'
}

export const invalidRequest = {
  status: 422,
  route: '*',
  action: '*',
  errorType: 'Invalid request',
  errorMessage: 'Insufficient data or corrupted values'
}

/* ADMIN */

export const encryptError = {
  route: 'admin',
  errorType: 'Encrypt',
  errorMessage: 'Encrypt error: operation failed'
}

export const credentialsError = {
  route: 'admin',
  errorType: 'Login or password not defined',
  errorMessage: 'Failed to change credentials'
}

export const authError = {
  status: 401,
  route: 'admin',
  errorType: 'DGtek admin authorization',
  errorMessage: 'Invalid login or password'
}

export const authOffline = {
  route: 'admin',
  errorType: 'DGtek admin authorization',
  errorMessage: 'Offline mode: authorization is impossible'
}

export const resetError = {
  route: 'admin',
  errorType: 'Reset password',
  errorMessage: 'Operation failed'
}

export const resetOffline = {
  route: 'admin',
  errorType: 'Reset password',
  errorMessage: 'Offline mode: it\'s impossible to reset password'
}

export const codeError = {
  status: 401,
  route: 'admin',
  errorType: 'Verification code',
  errorMessage: 'Invalid code value'
}

/* RSP */

export const refreshUsersError = {
  route: 'rsp',
  errorType: 'Partner\'s list',
  errorMessage: 'Unable to fetch the data from remote server'
}

export const getUsersError = {
  route: 'rsp',
  errorType: 'Partner\'s list',
  errorMessage: 'Failed to get data from local DB'
}

export const getResellersListError = {
  route: 'rsp',
  errorType: 'Partner\'s list',
  errorMessage: 'Unable to get the data from local DB'
}

export const getUserDetailsError = {
  route: 'rsp',
  errorType: 'Partner details',
  errorMessage: 'Failed to fetch RSP details'
}

export const updateUserDetailsError = {
  route: 'rsp',
  errorType: 'Partner details',
  errorMessage: 'Failed to update the data'
}

export const putUserRecordError = {
  route: 'rsp',
  errorType: 'Partner details',
  errorMessage: 'Failed to save data to local DB'
}

export const getRegistrationRequestsError = {
  route: 'rsp',
  errorType: 'Partner\'s registration requests',
  errorMessage: 'Failed to get the data'
}

export const approveRequestError = {
  route: 'rsp',
  errorType: 'Partner\'s registration request',
  errorMessage: 'Failed to approve request'
}

export const rejectRequestError = {
  route: 'rsp',
  errorType: 'Partner\'s registration request',
  errorMessage: 'Failed to reject request'
}

/* CUSTOMERS */

export const countCustomersDataError = {
  route: 'customers',
  errorType: 'Customers',
  errorMessage: 'Failed to read the customers from local DB'
}

export const getCustomerDataError = {
  route: 'customers',
  errorType: 'Customer details',
  errorMessage: 'Failed to get customer details'
}

export const getCustomerServiceError = {
  route: 'customers',
  errorType: 'Customer service',
  errorMessage: 'Service does not exist'
}

export const getCustomersListError = {
  route: 'customers',
  errorType: 'Customers',
  errorMessage: 'Failed to get customers list from local DB'
}

export const postNewCustomerError = {
  route: 'customers',
  errorType: 'New customer',
  errorMessage: 'Failed to create new customer'
}

export const putCustomerDataError = {
  route: 'customers',
  errorType: 'Customer details',
  errorMessage: 'Failed to save data'
}

export const refreshCustomersListError = {
  route: 'customers',
  errorType: 'Customers',
  errorMessage: 'Failed to get customers list from remote server'
}

export const deleteCustomerError = {
  route: 'customers',
  errorType: 'Customers',
  errorMessage: 'Failed to remove customer'
}

/* SCHEDULE */

export const getScheduleError = {
  route: 'schedule',
  errorType: 'Schedule',
  errorMessage: 'Failed to get data from local DB'
}

export const putScheduleRecordError = {
  route: 'schedule',
  errorType: 'Schedule',
  errorMessage: 'Unable to store the schedule record in local DB'
}

export const refreshScheduleError = {
  route: 'schedule',
  errorType: 'Schedule',
  errorMessage: 'Failed to fetch the data from remote server'
}

export const updateScheduleSettingsError = {
  status: 422,
  route: 'schedule',
  action: 'config',
  error: true,
  errorType: 'Schedule settings',
  errorMessage: 'Failed to save the data to remote server'
}

export const updateScheduleRecordStatusError = {
  route: 'schedule',
  errorType: 'Schedule: update service delivery status',
  errorMessage: 'Operation failed: schedule record was not found in local DB'
}

export const updateStatusError = {
  route: 'schedule',
  errorType: 'Customer service delivery status',
  errorMessage: 'Unable to update the service delivery status'
}

export const deleteScheduleRecordError = {
  route: 'schedule',
  errorType: 'Schedule',
  errorMessage: 'Failed to delete the data'
}

/* SERVICES */

export const getServiceDetailsError = {
  route: 'services',
  errorType: 'Services',
  errorMessage: 'Failed to get service details from local DB'
}

export const getServicesListError = {
  route: 'services',
  errorType: 'Services',
  errorMessage: 'Failed to get services from local DB'
}

export const postServiceDetailsError = {
  route: 'services',
  errorType: 'Create service',
  errorMessage: 'Failed to save new service details to remote server'
}

export const postServiceDetailsLocalError = {
  route: 'services',
  errorType: 'Create service',
  errorMessage: 'Failed to save new service details to local DB'
}

export const deleteServiceError = {
  route: 'services',
  errorType: 'Services',
  errorMessage: 'Failed to delete service from remote server'
}

export const deleteServiceLocalError = {
  route: 'services',
  errorType: 'Services',
  errorMessage: 'Failed to delete service from local DB. Try to refresh services.'
}

export const putServiceDetailsError = {
  route: 'services',
  errorType: 'Services',
  errorMessage: 'Failed to save service details'
}

export const refreshServicesListError = {
  route: 'services',
  errorType: 'Services',
  errorMessage: 'Failed to get services from remote server'
}

export const getSLAListError = {
  route: 'sla',
  errorType: 'Services',
  errorMessage: 'Failed to read SLA list from remote server'
}

/* TICKETS */

export const getCategoriesError = {
  route: 'tickets',
  errorType: 'Ticket categories',
  errorMessage: 'Failed to get data from local DB'
}

export const getTicketDataError = {
  route: 'tickets',
  errorType: 'Ticket details',
  errorMessage: 'Failed to get ticket data from local DB'
}

export const getTicketsListError = {
  route: 'tickets',
  action: 'list',
  errorType: 'Tickets',
  errorMessage: 'Failed to get tickets list from local DB'
}

export const postNewTicketError = {
  route: 'tickets',
  errorType: 'New ticket',
  errorMessage: 'Failed to create new ticket'
}

export const putCategoriesError = {
  route: 'tickets',
  errorType: 'Ticket categories',
  errorMessage: 'Failed to update data'
}

export const putTicketDataError = {
  route: 'tickets',
  errorType: 'Ticket',
  errorMessage: 'Failed to save response'
}

export const refreshTicketsListError = {
  route: 'tickets',
  errorType: 'Tickets',
  errorMessage: 'Failed to get the tickets from remote server'
}

/* DOCUMENTS */

export const refreshDocumentsListError = {
  route: 'documents',
  action: 'refresh',
  errorType: 'Documents',
  errorMessage: 'Failed to get the documents list from remote server'
}

export const documentsFolderListError = {
  route: 'documents',
  action: 'dir',
  errorType: 'Documents',
  errorMessage: 'Failed to get the folders list from local DB'
}

export const documentContentError = {
  route: 'documents',
  action: 'get',
  errorType: 'Document',
  errorMessage: 'Failed to get the document content from remote server'
}

export const createNewDocumentError = {
  route: 'documents',
  action: 'post',
  errorType: 'New document',
  errorMessage: 'Failed to create new document: remote server error'
}

export const updateDocumentError = {
  route: 'documents',
  action: 'update',
  errorType: 'Document',
  errorMessage: 'Failed to update document details: remote server error'
}

/* END */
