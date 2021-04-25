export const codeHandler = (function () {
  let code = ''
  return function (value) {
    if (!value) return code
    code = value
  }
})()
