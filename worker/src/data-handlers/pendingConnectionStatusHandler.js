export const pendingConnectionStatusHandler = (function () {
  let pendingConnectionStatus = []
  return function (value) {
    if (!value) return pendingConnectionStatus
    pendingConnectionStatus = value.partner && value.admin ? value : pendingConnectionStatus
  }
})()
