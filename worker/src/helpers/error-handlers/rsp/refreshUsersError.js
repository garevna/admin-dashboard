export const refreshUsersError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'rsp',
    error: true,
    errorType: 'RSP list',
    errorMessage: 'Unable to fetch the data from remote server'
  }
}
