export const deleteCustomerAccessError = {
  status: 403,
  route: 'customers',
  action: 'delete',
  result: null,
  error: true,
  errorType: 'Access denied',
  errorMessage: 'Failed to remove customer: you have no rights to perform this action'
}
