const pendingConnectionStatus = {}

export const pendingConnectionStatusHandler = function (data) {
  if (!data) return pendingConnectionStatus
  Object.assign(pendingConnectionStatus, {
    partner: data.partner || pendingConnectionStatus.partner,
    admin: data.admin || pendingConnectionStatus.admin
  })
}
