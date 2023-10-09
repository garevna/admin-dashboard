let settings = []

export const scheduleSettingsHandler = function (value) {
  if (!value) return settings
  settings = Array.isArray(value) ? value : settings
}
