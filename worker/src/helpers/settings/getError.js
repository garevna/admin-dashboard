export const getError = section => ({
  status: 422,
  route: 'settings',
  action: 'get',
  section,
  data: null,
  error: true,
  errorType: 'Get settings',
  errorMessage: `Request for ${section} is invalid`
})
