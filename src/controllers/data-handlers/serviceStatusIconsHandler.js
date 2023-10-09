export const serviceStatusIconsHandler = (function () {
  let icons = {}
  return function (value) {
    if (!value) return icons
    icons = value
  }
})()
