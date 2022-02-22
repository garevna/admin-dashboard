let scheduleCalendarSettings = {}

export const scheduleCalendarSettingsHandler = function (data) {
  if (data) scheduleCalendarSettings = data
  else return scheduleCalendarSettings
}
