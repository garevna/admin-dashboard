const buildingSettings = {}

export const buildingSettingsHandler = function (data) {
  if (!data) return buildingSettings
  Object.assign(buildingSettings, data)
}
