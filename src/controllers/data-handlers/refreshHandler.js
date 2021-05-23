export const refreshHandler = (function () {
  const refreshed = {
    rsp: false,
    customers: false,
    services: false,
    tickets: false,
    schedule: false
  }
  return function (route, value) {
    if (!route) return refreshed
    if (route && !value) return refreshed[route]
    refreshed[route] = true
  }
})()
