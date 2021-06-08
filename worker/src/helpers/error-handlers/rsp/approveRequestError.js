export const approveRequestError = function (status) {
  return {
    status,
    action: 'confirm',
    route: 'rsp',
    error: true,
    errorType: 'Partner\'s registration request',
    errorMessage: 'Failed to approve request'
  }
}
