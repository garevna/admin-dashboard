export const invalidRequest = function (route, action, errorType) {
  return {
    status: 422,
    route,
    action,
    error: true,
    errorType: errorType || 'Invalid request',
    errorMessage: 'Invalid request: insufficient data or corrupted values'
  }
}
