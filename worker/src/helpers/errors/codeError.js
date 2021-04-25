export const codeError = function (status) {
  return {
    status,
    route: 'admin',
    action: 'reset',
    error: true,
    errorType: 'Verification',
    errorMessage: 'Invalid code'
  }
}
