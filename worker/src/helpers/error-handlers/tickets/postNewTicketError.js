export const postNewTicketError = function (status) {
  return {
    status,
    action: 'post',
    route: 'tickets',
    error: true,
    errorType: 'New ticket',
    errorMessage: 'Failed to create new ticket'
  }
}
