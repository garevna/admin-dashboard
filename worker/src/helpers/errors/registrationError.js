export const registrationError = function (status) {
  return {
    status,
    route: 'admin',
    action: 'registration',
    error: true,
    errorType: 'DGtek Partner registration',
    errorMessage: 'Operation failed'
  }
}
