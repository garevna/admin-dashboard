export const putTicketDataError = function (status) {
  return {
    status,
    action: 'put',
    route: 'tickets',
    error: true,
    errorType: 'Ticket details',
    errorMessage: 'Failed to save ticket details'
  }
}
