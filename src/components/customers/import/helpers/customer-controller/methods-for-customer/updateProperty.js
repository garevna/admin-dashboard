import { errorsController } from '@/components/customers/import/controllers'

export function updateProperty (propName, propValue) {
  this[propName] = propValue
  if (propName === 'apartmentNumber') {
    this.uniqueCode = `${this.uniqueCode.split('.').slice(0, -1).join('.')}.${propValue}`
  }

  errorsController.testCustomer(this.getValue(), this.getIndex())

  this.emitEvent()
}
