export const refreshCustomersListError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'customers',
    error: true,
    errorType: 'Customers',
    errorMessage: 'Failed to get customers data from remote server'
  }
}
