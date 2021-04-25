export const credentialsError = function (status) {
  return {
    status,
    action: 'put',
    route: 'admin',
    error: true,
    errorType: 'Login or password not defined',
    errorMessage: 'Failed to change credentials'
  }
}
