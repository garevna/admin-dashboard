export function changeServiceStatus (status) {
  Object.assign(this.services[this.serviceIndex], { status })
}
