export const getRegistrationRequestsError = function (status) {
  return {
    status,
    action: 'registration',
    route: 'rsp',
    error: true,
    errorType: 'Partner\'s registration requests',
    errorMessage: 'Failed to get the data'
  }
}
