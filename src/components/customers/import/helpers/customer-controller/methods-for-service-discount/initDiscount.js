export function initDiscount () {
  if (this.serviceIndex === -1) return this.showError('Init discount failed')

  Object.assign(this.services[this.serviceIndex], {
    discount: {
      units: 'sum',
      value: 0,
      period: [this.getDiscountPeriodStartDate(), null]
    }
  })
}
