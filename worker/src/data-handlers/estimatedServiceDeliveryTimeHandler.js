let estimatedServiceDeliveryTime = {}

export const estimatedServiceDeliveryTimeHandler = function (data) {
  if (!data) return estimatedServiceDeliveryTime
  estimatedServiceDeliveryTime = data
}
