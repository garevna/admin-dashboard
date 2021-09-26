export const estimatedServiceDeliveryTimeHandler = (function () {
  let estimatedServiceDeliveryTime = {}
  return function (data) {
    if (data) estimatedServiceDeliveryTime = data
    else return estimatedServiceDeliveryTime
  }
})()
