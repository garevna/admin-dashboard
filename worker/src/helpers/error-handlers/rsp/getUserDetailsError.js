export const getUserDetailsError = function (status) {
  return {
    status,
    action: 'get',
    route: 'rsp',
    error: true,
    errorType: 'RSP details',
    errorMessage: 'Failed to fetch RSP details'
  }
}
