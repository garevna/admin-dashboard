export const getClientDetailsError = function (status) {
  return {
    status,
    action: 'get',
    route: 'rsp',
    error: true,
    errorType: 'RSP details',
    errorMessage: 'Failed to get RSP details from remote server'
  }
}
