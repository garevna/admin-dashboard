const buildingSettings = {
  buildingClass: null,
  buildingType: null,
  buildingCategory: null
}

export const buildingSettingsHandler = function (data) {
  if (!data) return buildingSettings
  Object.assign(buildingSettings, data)
}
