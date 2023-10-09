const [route, action, error, errorType, result] = [
  'building',
  'get-buildings-by-postcode',
  true,
  'Error reading buildings DB',
  null
]

const notValid = {
  route,
  action,
  status: 422,
  error,
  errorType,
  errorMessage: 'Invalid building postcode requested',
  result
}

const requestFailed = {
  route,
  action,
  status: 400,
  error,
  errorType,
  errorMessage: 'Channel with map.worker failed',
  result
}

export const getBuildingsByPostcodeErrors = {
  notValid,
  requestFailed
}
