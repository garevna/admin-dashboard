import { fatalErrorsController } from '@/components/customers/import/controllers'

export function updateService (id, serviceName) {
  if (this.serviceIndex === -1) return this.showError('Update service failed')

  Object.assign(this.services[this.serviceIndex], { id, serviceName })
  // this.serviceName = serviceName

  fatalErrorsController.testCustomer(this.getValue(), this.getIndex())

  this.emitEvent()
}
