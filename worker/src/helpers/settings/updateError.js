export const updateError = section => ({
  status: 422,
  route: 'settings',
  action: 'update',
  section,
  error: true,
  errorType: 'Invalid request',
  errorMessage: `Requst for ${section} is ivalid`
})
