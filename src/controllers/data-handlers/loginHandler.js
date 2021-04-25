export const loginHandler = (function () {
  let login = ''
  return function (value) {
    if (!value) return login
    login = value
  }
})()
