export const getCustomerDataError = function (status) {
  return {
    status,
    action: 'get',
    route: 'customers',
    error: true,
    errorType: 'Customer details',
    errorMessage: 'Failed to get customer details'
  }
}
