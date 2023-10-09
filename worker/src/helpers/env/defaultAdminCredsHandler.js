let credentials = ''

export const defaultAdminCredsHandler = function (value) {
  if (!value) return credentials
  credentials = value
}
