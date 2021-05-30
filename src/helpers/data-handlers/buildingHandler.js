export const buildingHandler = (function () {
  let buildingId = null
  return function (value) {
    if (!value) return buildingId
    if (value === 'reset') {
      buildingId = null
    } else {
      buildingId = value
    }
  }
})()
