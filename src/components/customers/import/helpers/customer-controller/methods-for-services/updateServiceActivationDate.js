import { errorsController } from '@/components/customers/import/controllers'

export function updateServiceActivationDate (date) {
  if (this.serviceIndex === -1) return this.showError('Set activation date failed')

  const ms = Date.parse(date)

  Object.assign(this.services[this.serviceIndex], {
    activationDate: date,
    log: { [ms.toString()]: 'Active' },
    modified: ms
  })

  const discount = this.services[this.serviceIndex].discount

  if (!discount) this.initDiscount()
  else {
    const period = this.services[this.serviceIndex].discount.period
    Object.assign(this.services[this.serviceIndex].discount, { period: [ms, period[1]] })
  }

  errorsController.testCustomer(this.getValue(), this.getIndex())

  this.emitEvent()
}
