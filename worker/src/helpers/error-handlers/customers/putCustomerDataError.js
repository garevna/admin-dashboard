export const putCustomerDataError = function (status) {
  return {
    status,
    action: 'put',
    route: 'customers',
    error: true,
    errorType: 'Customer details',
    errorMessage: 'Failed to save data'
  }
}
