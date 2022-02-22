let serviceStatusIcons = {}

export const serviceStatusIconsHandler = function (value) {
  if (!value) return serviceStatusIcons
  serviceStatusIcons = value
}
