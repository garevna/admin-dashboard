export function setCustomer (index, customerData) {
  this.index = index
  this.setCustomerProps(customerData)

  if (customerData._id) {
    this.root.__getCustomerServices(customerData._id, this.updateServices.bind(this))
  } else {
    this.serviceIndex = 0
    this.services = Array.isArray(customerData.services) ? customerData.services : this.initServices()
    this.setConnectionData(customerData.services[this.serviceIndex || 0].connectionData || {})
  }

  this.emitEvent()
}
