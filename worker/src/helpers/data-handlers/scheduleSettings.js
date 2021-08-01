export const scheduleSettings = (function () {
  let settings = []
  return function (value) {
    if (!value) return settings
    settings = Array.isArray(value) ? value : settings
  }
})()
