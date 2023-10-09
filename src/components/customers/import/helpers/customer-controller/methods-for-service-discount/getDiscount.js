export function getDiscount () {
  if (this.serviceIndex === -1) return this.showError('Get discount failed')

  if (!this.services[this.serviceIndex].discount) return this.initDiscount()
  else return this.services[this.serviceIndex].discount
}
