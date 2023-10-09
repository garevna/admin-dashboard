import { errorsController } from '@/components/customers/import/controllers'

export function updateServiceSuspendDate (date) {
  if (this.serviceIndex === -1) return this.showError('Set service suspension date failed')

  const ms = Date.parse(date)

  Object.assign(this.services[this.serviceIndex], { suspendDate: date, modified: ms })

  errorsController.testCustomer(this.getValue(), this.getIndex())

  this.emitEvent()
}
