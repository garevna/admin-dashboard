export const getError = section => ({
  status: 422,
  route: 'settings',
  action: 'get',
  section,
  data: null,
  error: true,
  errorType: 'Invalid request',
  errorMessage: `Requst for ${section} is ivalid`
})
