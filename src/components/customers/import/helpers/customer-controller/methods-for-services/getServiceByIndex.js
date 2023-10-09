export function getServiceByIndex (index) {
  if (!this.services || !this.services.length) return this.showError('Services are not defined')
  return this.services[index]
}
