export function initDiscountPeriod () {
  if (this.serviceIndex === -1) return this.showError('Init discount period failed')

  if (!this.services[this.serviceIndex].discount) this.initDiscount()
  else Object.assign(this.services[this.serviceIndex].discount, { period: [this.getDiscountPeriodStartDate(), null] })

  this.emitEvent()
}
