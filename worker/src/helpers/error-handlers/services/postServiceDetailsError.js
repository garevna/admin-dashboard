export const postServiceDetailsError = function (status) {
  return {
    status,
    action: 'post',
    route: 'services',
    error: true,
    errorType: 'Services',
    errorMessage: 'Failed to create new service'
  }
}
