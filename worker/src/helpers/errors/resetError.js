export const resetError = function (status) {
  return {
    status,
    route: 'admin',
    action: 'reset',
    error: true,
    errorType: 'Reset password',
    errorMessage: 'Operation failed'
  }
}
