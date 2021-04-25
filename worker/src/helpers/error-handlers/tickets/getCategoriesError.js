export const getCategoriesError = function (status) {
  return {
    status,
    route: 'tikets',
    action: 'categories',
    error: true,
    errorType: 'Tickets',
    errorMessage: 'Failed to get ticket\'s categories from local DB'
  }
}
