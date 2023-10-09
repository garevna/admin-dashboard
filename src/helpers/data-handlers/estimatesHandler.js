export const estimatesHandler = (function () {
  const estimates = {}
  return function (data) {
    if (!data) return estimates
    if (Array.isArray(data)) {
      Object.assign(estimates, ...data)
    } else {
      return estimates[data]
    }
  }
})()
