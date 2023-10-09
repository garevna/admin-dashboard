export function resetDiscount () {
  if (this.serviceIndex === -1) return this.showError('Reset discount failed')

  Object.assign(this.services[this.serviceIndex], { discount: null })

  this.emitEvent()
}
