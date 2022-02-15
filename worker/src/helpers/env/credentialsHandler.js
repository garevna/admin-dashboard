let credentials = ''

export const credentialsHandler = function (value) {
  if (value) {
    credentials = value === 'reset' ? null : value
  } else return credentials
}
