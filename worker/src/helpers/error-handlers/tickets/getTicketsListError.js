export const getTicketsListError = function (status) {
  return {
    status,
    action: 'get',
    route: 'tikets',
    error: true,
    errorType: 'Tickets',
    errorMessage: 'Failed to get tickets from local DB'
  }
}
