export const refreshTicketsListError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'tickets',
    error: true,
    errorType: 'Tickets',
    errorMessage: 'Failed to get the tickets from remote server'
  }
}
