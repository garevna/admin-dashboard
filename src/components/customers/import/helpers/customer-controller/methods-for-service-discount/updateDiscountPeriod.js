export function updateDiscountPeriod (index, date) {
  if (this.serviceIndex === -1) return this.showError('Update discount period failed')

  const period = this.getDiscountPeriod()
  period.splice(index, 1, Date.parse(date))
  Object.assign(this.services[this.serviceIndex].discount, { period })

  this.emitEvent()
}
