export const authOffline = function () {
  return {
    status: 0,
    route: 'admin',
    action: 'auth',
    error: true,
    errorType: 'DGtek Partner authorization',
    errorMessage: 'Offline mode: authorization is impossible'
  }
}
