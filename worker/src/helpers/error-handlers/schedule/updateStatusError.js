export const updateStatusError = function (status, route, action, remote) {
  return {
    status,
    action,
    route,
    error: true,
    errorType: 'Service delivery status',
    errorMessage: remote ? 'Unable to update the service delivery status: remote server error'
      : 'Service delivery status was updated at the remote server, but the local DB error occurred'
  }
}
