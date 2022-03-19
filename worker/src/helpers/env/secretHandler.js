let secret = ''

export const secretHandler = function (value) {
  if (!value) return secret
  secret = value
}
