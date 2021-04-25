export const getServicesListError = function (status) {
  return {
    status,
    action: 'list',
    route: 'services',
    error: true,
    errorType: 'Services',
    errorMessage: 'Failed to get services from local DB'
  }
}
