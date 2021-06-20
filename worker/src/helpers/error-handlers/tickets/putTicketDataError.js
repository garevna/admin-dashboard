export const putTicketDataError = function (status) {
  return {
    status,
    action: 'put',
    route: 'tickets',
    error: true,
    errorType: 'Ticket',
    errorMessage: 'Failed to save response'
  }
}
