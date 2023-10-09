export function updateDiscount (discount) {
  if (this.serviceIndex === -1) return this.showError('Update discount failed')

  Object.assign(this.services[this.serviceIndex], { discount })

  this.emitEvent()
}
