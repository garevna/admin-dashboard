export const getRealMRR = service => service.discountValue
  ? service.discountUnits === '%'
    ? self.roundFloat(service.subscriptionFee * (100 - service.discountValue) / 100)
    : self.roundFloat(service.subscriptionFee - service.discountValue)
  : service.subscriptionFee
