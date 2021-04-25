export const authError = function (status, login) {
  return {
    status,
    route: 'admin',
    action: 'auth',
    error: true,
    errorType: `Authorization for ${login}`,
    errorMessage: 'Invalid login or password'
  }
}
