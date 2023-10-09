export const credentialsHandler = (function () {
  let credentials = ''
  return function (value) {
    if (!value) return credentials
    credentials = value
  }
})()
