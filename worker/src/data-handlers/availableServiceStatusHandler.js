export const availableServiceStatusHandler = (function () {
  let availableServiceStatus = []
  return function (value) {
    if (!value) return availableServiceStatus
    availableServiceStatus = Array.isArray(value) ? value : availableServiceStatus
  }
})()
