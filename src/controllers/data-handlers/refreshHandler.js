export const refreshHandler = (function () {
  const refreshed = {
    buildings: false,
    rsp: false,
    services: false,
    tickets: false,
    customers: false,
    schedule: false,
    documents: false
  }
  return function (route, value) {
    if (!route) return refreshed
    if (route && !value) return refreshed[route]
    refreshed[route] = true
  }
})()
