export const getTicketDataError = function (status) {
  return {
    status,
    action: 'get',
    route: 'tikets',
    error: true,
    errorType: 'Ticket details',
    errorMessage: 'Failed to get ticket data from local DB'
  }
}
