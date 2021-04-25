export const getServiceDetailsError = function (status) {
  return {
    status,
    action: 'get',
    route: 'services',
    error: true,
    errorType: 'Services',
    errorMessage: 'Failed to get service details from local DB'
  }
}
