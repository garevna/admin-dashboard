let availableServiceStatus = []

export const availableServiceStatusHandler = function (data) {
  if (!data) return availableServiceStatus
  availableServiceStatus = Array.isArray(data) ? data : availableServiceStatus
}
