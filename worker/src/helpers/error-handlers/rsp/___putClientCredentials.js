export const putClientCredentialsError = function (status) {
  return {
    status,
    action: 'put',
    route: 'rsp',
    error: true,
    errorType: 'Company credentials',
    errorMessage: 'Failed to change company credentials'
  }
}
