import { errorsController } from '@/components/customers/import/controllers'

export function updateServiceSuspendedDate (date) {
  if (this.serviceIndex === -1) return this.showError('Set service suspended date failed')

  const ms = Date.parse(date)

  Object.assign(this.services[this.serviceIndex], { suspendedDate: date, modified: ms })

  errorsController.testCustomer(this.getValue(), this.getIndex())

  this.emitEvent()
}
