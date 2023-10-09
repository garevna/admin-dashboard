export const errorMessageHandler = (function () {
  let errorType = ''
  let errorMessage = ''
  return function (value) {
    if (!value) return { errorType, errorMessage }
    errorType = value.errorType
    errorMessage = value.errorMessage
  }
})()
