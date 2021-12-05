export const serviceStatusIconsHandler = (function () {
  let serviceStatusIcons = {}
  return function (value) {
    if (!value) return serviceStatusIcons
    serviceStatusIcons = value
  }
})()
