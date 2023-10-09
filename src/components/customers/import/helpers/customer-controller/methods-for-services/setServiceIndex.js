export function setServiceIndex (val) {
  this.serviceIndex = val || 0
  this.emitEvent()
}
