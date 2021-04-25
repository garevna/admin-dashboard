export const putServiceDetailsError = function (status) {
  return {
    status,
    action: 'put',
    route: 'services',
    error: true,
    errorType: 'Services',
    errorMessage: 'Failed to save service details'
  }
}
