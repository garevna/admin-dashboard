export const refreshClientsListError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'rsp',
    error: true,
    errorType: 'RSP list',
    errorMessage: 'Failed to get RSP list from remote server'
  }
}
