export const rejectRequestError = function (status) {
  return {
    status,
    action: 'reject',
    route: 'rsp',
    error: true,
    errorType: 'Partner\'s registration request',
    errorMessage: 'Failed to reject request'
  }
}
