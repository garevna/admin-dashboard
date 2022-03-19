const accessSettings = { access: null, roles: null, dashboard: null }

export const accessSettingsHandler = function (data) {
  if (!data) return accessSettings
  const { access, roles, dashboard } = data
  Object.assign(accessSettings, { access, roles, dashboard })
}
