export function getDiscountPeriod () {
  if (this.serviceIndex === -1) return this.showError('Get discount period failed')

  if (!this.services[this.serviceIndex].discount) this.initDiscount()
  else if (!this.services[this.serviceIndex].discount.period) this.initDiscountPeriod()
  return this.services[this.serviceIndex].discount.period
}
