export const buildingStatusHandler = (function () {
  let status = 'lit'
  return function (value) {
    if (!value) return status
    status = value
  }
})()
