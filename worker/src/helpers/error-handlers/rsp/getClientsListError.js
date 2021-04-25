export const getClientsListError = function (status) {
  return {
    status,
    action: 'list',
    route: 'rsp',
    error: true,
    errorType: 'RSP list',
    errorMessage: 'Failed to get data from local DB'
  }
}
