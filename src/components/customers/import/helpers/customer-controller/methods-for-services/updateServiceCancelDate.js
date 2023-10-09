import { errorsController } from '@/components/customers/import/controllers'

export function updateServiceCancelDate (date) {
  if (this.serviceIndex === -1) return this.showError('Set service cancelation date failed')

  const ms = Date.parse(date)

  Object.assign(this.services[this.serviceIndex], { cancelDate: date, modified: ms })

  errorsController.testCustomer(this.getValue(), this.getIndex())

  this.emitEvent()
}
