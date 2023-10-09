export const passwordHandler = (function () {
  let pass = ''
  return function (value) {
    if (!value) return pass
    pass = value
  }
})()
