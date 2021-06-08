export const getResellersListError = function (status) {
  return {
    status,
    action: 'list',
    route: 'rsp',
    error: true,
    errorType: 'RSP list',
    errorMessage: 'Unable to get the data from local DB'
  }
}
