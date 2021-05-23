export const getCategoriesError = function (status) {
  return {
    status,
    route: 'categories',
    action: 'get',
    error: true,
    errorType: 'Ticket categories',
    errorMessage: 'Failed to get data from local DB'
  }
}
