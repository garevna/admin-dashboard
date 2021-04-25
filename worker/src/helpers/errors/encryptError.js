export const encryptError = function () {
  return {
    status: 422,
    route: 'admin',
    action: 'encrypt',
    error: true,
    errorType: 'Encrypt',
    errorMessage: 'Encrypt error: operation failed'
  }
}
