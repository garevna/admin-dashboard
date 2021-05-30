export const getCustomerServiceError = function (status) {
  return {
    status,
    action: 'service',
    route: 'customers',
    error: true,
    errorType: 'Customer service',
    errorMessage: 'Service does not exist'
  }
}
