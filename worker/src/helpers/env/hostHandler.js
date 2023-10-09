let host = ''

export const hostHandler = function (value) {
  if (value) { host = value } else return host
}
