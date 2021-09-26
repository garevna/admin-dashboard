export const scheduleCalendarSettingsHandler = (function () {
  let scheduleCalendarSettings = {}
  return function (data) {
    if (data) scheduleCalendarSettings = data
    else return scheduleCalendarSettings
  }
})()
