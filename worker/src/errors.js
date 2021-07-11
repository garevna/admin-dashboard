/* ADMIN */

export const encryptError = {
  errorType: 'Encrypt',
  errorMessage: 'Encrypt error: operation failed'
}

export const credentialsError = {
  errorType: 'Login or password not defined',
  errorMessage: 'Failed to change credentials'
}

export const invalidRequest = {
  errorType: 'Invalid request',
  errorMessage: 'Insufficient data or corrupted values'
}

export const authError = {
  errorType: 'DGtek Partner authorization',
  errorMessage: 'Invalid login or password'
}

export const authOffline = {
  errorType: 'DGtek Partner authorization',
  errorMessage: 'Offline mode: authorization is impossible'
}

export const resetError = {
  errorType: 'Reset password',
  errorMessage: 'Operation failed'
}

export const resetOffline = {
  errorType: 'Reset password',
  errorMessage: 'Offline mode: it\'s impossible to reset password'
}

export const codeError = {
  errorType: 'Verification code',
  errorMessage: 'Invalid code value'
}

/* RSP */

export const refreshUsersError = {
  errorType: 'Partner\'s list',
  errorMessage: 'Unable to fetch the data from remote server'
}

export const getUsersError = {
  errorType: 'Partner\'s list',
  errorMessage: 'Failed to get data from local DB'
}

export const getResellersListError = {
  errorType: 'Partner\'s list',
  errorMessage: 'Unable to get the data from local DB'
}

export const getUserDetailsError = {
  errorType: 'Partner details',
  errorMessage: 'Failed to fetch RSP details'
}

export const updateUserDetailsError = {
  errorType: 'Partner details',
  errorMessage: 'Failed to update the data'
}

export const putUserRecordError = {
  errorType: 'Partner details',
  errorMessage: 'Failed to save data to local DB'
}

export const getRegistrationRequestsError = {
  errorType: 'Partner\'s registration requests',
  errorMessage: 'Failed to get the data'
}

export const approveRequestError = {
  errorType: 'Partner\'s registration request',
  errorMessage: 'Failed to approve request'
}

export const rejectRequestError = {
  errorType: 'Partner\'s registration request',
  errorMessage: 'Failed to reject request'
}

/* CUSTOMERS */

export const countCustomersDataError = {
  errorType: 'Customers',
  errorMessage: 'Failed to read the customers from local DB'
}

export const getCustomerDataError = {
  errorType: 'Customer details',
  errorMessage: 'Failed to get customer details'
}

export const getCustomerServiceError = {
  errorType: 'Customer service',
  errorMessage: 'Service does not exist'
}

export const getCustomersListError = {
  errorType: 'Customers',
  errorMessage: 'Failed to get customers list from local DB'
}

export const postNewCustomerError = {
  errorType: 'New customer',
  errorMessage: 'Failed to create new customer'
}

export const putCustomerDataError = {
  errorType: 'Customer details',
  errorMessage: 'Failed to save data'
}

export const refreshCustomersListError = {
  errorType: 'Customers',
  errorMessage: 'Failed to get customers list from remote server'
}

export const deleteCustomerError = {
  errorType: 'Customers',
  errorMessage: 'Failed to remove customer'
}

/* SCHEDULE */

export const getScheduleError = {
  errorType: 'Schedule',
  errorMessage: 'Failed to get data from local DB'
}

export const putScheduleRecordError = {
  errorType: 'Schedule',
  errorMessage: 'Unable to store the schedule record in local DB'
}

export const refreshScheduleError = {
  errorType: 'Schedule',
  errorMessage: 'Failed to fetch the data from remote server'
}

export const updateScheduleRecordError = {
  errorType: 'Schedule',
  errorMessage: 'Failed to update the data'
}

export const updateScheduleRecordStatusError = {
  errorType: 'Schedule: update service delivery status',
  errorMessage: 'Operation failed: schedule record was not found in local DB'
}

export const updateStatusError = {
  errorType: 'Customer service delivery status',
  errorMessage: 'Unable to update the service delivery status'
}

export const deleteScheduleRecordError = {
  errorType: 'Schedule',
  errorMessage: 'Failed to delete the data'
}

/* SERVICES */

export const getServiceDetailsError = {
  errorType: 'Services',
  errorMessage: 'Failed to get service details from local DB'
}

export const getServicesListError = {
  errorType: 'Services',
  errorMessage: 'Failed to get services from local DB'
}

export const postServiceDetailsError = {
  errorType: 'Services',
  errorMessage: 'Failed to create new service'
}

export const putServiceDetailsError = {
  errorType: 'Services',
  errorMessage: 'Failed to save service details'
}

export const refreshServicesListError = {
  errorType: 'Services',
  errorMessage: 'Failed to get services from remote server'
}

export const getSLAListError = {
  errorType: 'Services',
  errorMessage: 'Failed to read SLA list from remote server'
}

/* TICKETS */

export const getCategoriesError = {
  errorType: 'Ticket categories',
  errorMessage: 'Failed to get data from local DB'
}

export const getTicketDataError = {
  errorType: 'Ticket details',
  errorMessage: 'Failed to get ticket data from local DB'
}

export const getTicketsListError = {
  errorType: 'Tickets',
  errorMessage: 'Failed to get tickets list from local DB'
}

export const postNewTicketError = {
  errorType: 'New ticket',
  errorMessage: 'Failed to create new ticket'
}

export const putCategoriesError = {
  errorType: 'Ticket categories',
  errorMessage: 'Failed to update data'
}

export const putTicketDataError = {
  errorType: 'Ticket',
  errorMessage: 'Failed to save response'
}

export const refreshTicketsListError = {
  errorType: 'Tickets',
  errorMessage: 'Failed to get the tickets from remote server'
}

export const offline = {
  errorType: 'Offline mode',
  errorMessage: 'Operation failed'
}

/* END */
