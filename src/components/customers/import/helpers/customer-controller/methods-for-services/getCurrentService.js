export function getCurrentService () {
  if (this.serviceIndex === -1) return this.showError('Service index is not defined')
  return this.services[this.serviceIndex]
}
