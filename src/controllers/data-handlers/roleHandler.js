export const roleHandler = (function () {
  let role = ''
  return function (value) {
    if (!value) return role
    role = value
  }
})()
