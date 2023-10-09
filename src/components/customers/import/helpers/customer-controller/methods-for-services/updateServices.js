export function updateServices (data) {
  this.services.forEach((service, index) => Object.assign(service, data[index]))

  this.emitEvent('customer-services-updated')
}
