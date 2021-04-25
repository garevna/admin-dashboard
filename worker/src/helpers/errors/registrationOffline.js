export const registrationOffline = function () {
  return {
    status: 0,
    route: 'admin',
    action: 'registration',
    error: true,
    errorType: 'DGtek Partner registration',
    errorMessage: 'Offline mode: registration is impossible'
  }
}
