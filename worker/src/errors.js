/* ADMIN */

export const encryptError = {
  error: true,
  errorType: 'Encrypt',
  errorMessage: 'Encrypt error: operation failed'
}

export const credentialsError = {
  error: true,
  errorType: 'Login or password not defined',
  errorMessage: 'Failed to change credentials'
}

export const invalidRequest = {
  status: 422,
  error: true,
  errorType: 'Invalid request',
  errorMessage: 'Insufficient data or corrupted values'
}

export const authError = {
  status: 401,
  error: true,
  errorType: 'DGtek admin authorization',
  errorMessage: 'Invalid login or password'
}

export const authOffline = {
  error: true,
  errorType: 'DGtek admin authorization',
  errorMessage: 'Offline mode: authorization is impossible'
}

export const resetError = {
  error: true,
  errorType: 'Reset password',
  errorMessage: 'Operation failed'
}

export const resetOffline = {
  error: true,
  errorType: 'Reset password',
  errorMessage: 'Offline mode: it\'s impossible to reset password'
}

export const codeError = {
  status: 401,
  error: true,
  errorType: 'Verification code',
  errorMessage: 'Invalid code value'
}

/* RSP */

export const refreshUsersError = {
  error: true,
  errorType: 'Partner\'s list',
  errorMessage: 'Unable to fetch the data from remote server'
}

export const getUsersError = {
  error: true,
  errorType: 'Partner\'s list',
  errorMessage: 'Failed to get data from local DB'
}

export const getResellersListError = {
  error: true,
  errorType: 'Partner\'s list',
  errorMessage: 'Unable to get the data from local DB'
}

export const getUserDetailsError = {
  error: true,
  errorType: 'Partner details',
  errorMessage: 'Failed to fetch RSP details'
}

export const updateUserDetailsError = {
  error: true,
  errorType: 'Partner details',
  errorMessage: 'Failed to update the data'
}

export const putUserRecordError = {
  error: true,
  errorType: 'Partner details',
  errorMessage: 'Failed to save data to local DB'
}

export const getRegistrationRequestsError = {
  error: true,
  errorType: 'Partner\'s registration requests',
  errorMessage: 'Failed to get the data'
}

export const approveRequestError = {
  error: true,
  errorType: 'Partner\'s registration request',
  errorMessage: 'Failed to approve request'
}

export const rejectRequestError = {
  error: true,
  errorType: 'Partner\'s registration request',
  errorMessage: 'Failed to reject request'
}

/* CUSTOMERS */

export const countCustomersDataError = {
  error: true,
  errorType: 'Customers',
  errorMessage: 'Failed to read the customers from local DB'
}

export const getCustomerDataError = {
  error: true,
  errorType: 'Customer details',
  errorMessage: 'Failed to get customer details'
}

export const getCustomerServiceError = {
  error: true,
  errorType: 'Customer service',
  errorMessage: 'Service does not exist'
}

export const getCustomersListError = {
  error: true,
  errorType: 'Customers',
  errorMessage: 'Failed to get customers list from local DB'
}

export const postNewCustomerError = {
  error: true,
  errorType: 'New customer',
  errorMessage: 'Failed to create new customer'
}

export const putCustomerDataError = {
  error: true,
  errorType: 'Customer details',
  errorMessage: 'Failed to save data'
}

export const refreshCustomersListError = {
  error: true,
  errorType: 'Customers',
  errorMessage: 'Failed to get customers list from remote server'
}

export const deleteCustomerError = {
  error: true,
  errorType: 'Customers',
  errorMessage: 'Failed to remove customer'
}

/* SCHEDULE */

export const getScheduleError = {
  error: true,
  errorType: 'Schedule',
  errorMessage: 'Failed to get data from local DB'
}

export const putScheduleRecordError = {
  error: true,
  errorType: 'Schedule',
  errorMessage: 'Unable to store the schedule record in local DB'
}

export const refreshScheduleError = {
  error: true,
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
  error: true,
  errorType: 'Schedule: update service delivery status',
  errorMessage: 'Operation failed: schedule record was not found in local DB'
}

export const updateStatusError = {
  error: true,
  errorType: 'Customer service delivery status',
  errorMessage: 'Unable to update the service delivery status'
}

export const deleteScheduleRecordError = {
  error: true,
  errorType: 'Schedule',
  errorMessage: 'Failed to delete the data'
}

/* SERVICES */

export const getServiceDetailsError = {
  error: true,
  errorType: 'Services',
  errorMessage: 'Failed to get service details from local DB'
}

export const getServicesListError = {
  error: true,
  errorType: 'Services',
  errorMessage: 'Failed to get services from local DB'
}

export const postServiceDetailsError = {
  error: true,
  errorType: 'Services',
  errorMessage: 'Failed to create new service'
}

export const putServiceDetailsError = {
  error: true,
  errorType: 'Services',
  errorMessage: 'Failed to save service details'
}

export const refreshServicesListError = {
  error: true,
  errorType: 'Services',
  errorMessage: 'Failed to get services from remote server'
}

export const getSLAListError = {
  error: true,
  errorType: 'Services',
  errorMessage: 'Failed to read SLA list from remote server'
}

/* TICKETS */

export const getCategoriesError = {
  error: true,
  errorType: 'Ticket categories',
  errorMessage: 'Failed to get data from local DB'
}

export const getTicketDataError = {
  error: true,
  errorType: 'Ticket details',
  errorMessage: 'Failed to get ticket data from local DB'
}

export const getTicketsListError = {
  error: true,
  errorType: 'Tickets',
  errorMessage: 'Failed to get tickets list from local DB'
}

export const postNewTicketError = {
  error: true,
  errorType: 'New ticket',
  errorMessage: 'Failed to create new ticket'
}

export const putCategoriesError = {
  error: true,
  errorType: 'Ticket categories',
  errorMessage: 'Failed to update data'
}

export const putTicketDataError = {
  error: true,
  errorType: 'Ticket',
  errorMessage: 'Failed to save response'
}

export const refreshTicketsListError = {
  error: true,
  errorType: 'Tickets',
  errorMessage: 'Failed to get the tickets from remote server'
}

export const offline = {
  error: true,
  errorType: 'Offline mode',
  errorMessage: 'Operation failed'
}

/* END */
