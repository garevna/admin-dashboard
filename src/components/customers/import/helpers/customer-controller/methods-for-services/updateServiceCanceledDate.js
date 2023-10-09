import { errorsController } from '@/components/customers/import/controllers'

export function updateServiceCanceledDate (date) {
  if (this.serviceIndex === -1) return this.showError('Set service canceled date failed')

  const ms = Date.parse(date)

  Object.assign(this.services[this.serviceIndex], { canceledDate: date, modified: ms })

  errorsController.testCustomer(this.getValue(), this.getIndex())

  this.emitEvent()
}
