export const updateError = section => ({
  status: 422,
  route: 'settings',
  action: 'update',
  section,
  error: true,
  errorType: 'Update settings',
  errorMessage: `Request for settings ${section} is invalid`
})
