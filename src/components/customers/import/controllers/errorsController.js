import { BaseController } from './'
import { testCustomerForErrors, testForErrors } from '../helpers'

class ErrorsController extends BaseController {
  constructor () {
    super('errors')
  }

  test (customers) {
    this.items = testForErrors(customers)
    this.emitEvent()
  }

  testCustomer (customer, index) {
    this.removeAllCustomerRecords(index)

    this.add(testCustomerForErrors(customer, index))
    this.emitEvent()
  }

  getError (customerIndex, propName) {
    return this.items.filter(error => error.index === customerIndex && error.key === propName).length > 0
  }

  getServiceDateError (customerIndex) {
    const keys = ['activationDate', 'cancelDate', 'canceledDate', 'suspendDate', 'suspendedDate', 'resumeDate']
    return this.items
      .filter(error => error.index === customerIndex && keys.includes(error.key))
      .length > 0
  }

  getCustomerErrors (customerIndex) {
    return this.items.filter(error => error.index === customerIndex)
  }
}

export const errorsController = new ErrorsController()
