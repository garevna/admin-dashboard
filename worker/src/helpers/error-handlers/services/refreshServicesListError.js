export const refreshServicesListError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'services',
    error: true,
    errorType: 'Services',
    errorMessage: 'Failed to get services from remote server'
  }
}
