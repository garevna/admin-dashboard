export const deleteCustomerError = function (status) {
  return {
    status,
    action: 'delete',
    route: 'customers',
    error: true,
    errorType: 'Customers',
    errorMessage: 'Failed to delete customer'
  }
}
