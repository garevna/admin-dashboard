export const getCustomersListError = function (status) {
  return {
    status,
    action: 'get',
    route: 'customers',
    error: true,
    errorType: 'Customers',
    errorMessage: 'Failed to get customers list from local DB'
  }
}
