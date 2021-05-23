export const updateUserDetailsError = function (status) {
  return {
    status,
    action: 'update',
    route: 'rsp',
    error: true,
    errorType: 'RSP details',
    errorMessage: 'Failed to update the data'
  }
}
