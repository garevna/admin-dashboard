export function getConnectionData () {
  if (this.serviceIndex === -1) return this.showError('Get service connection data failed')
  return this.services[this.serviceIndex].connectionData
}
