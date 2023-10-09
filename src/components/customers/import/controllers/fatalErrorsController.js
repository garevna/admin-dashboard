import { BaseController } from './'
import { testCustomerForFatalErrors, testForFatalErrors } from '../helpers'

class FatalErrorsController extends BaseController {
  constructor () {
    super('fatal-errors')
  }

  getBuildingError (index) {
    return this.items.filter(error => error.index === index && error.key === 'buildingId').length
  }

  getServiceError (index) {
    return this.items.filter(error => error.index === index && error.key === 'serviceId').length
  }

  testCustomer (customer, index) {
    this.removeAllCustomerRecords(index)

    this.add(testCustomerForFatalErrors(customer, index))
    this.emitEvent()
  }

  test (customers) {
    if (!customers) return console.warn('Error: Customers are not defined!')
    this.items = testForFatalErrors(customers)
    this.emitEvent()
  }
}

export const fatalErrorsController = new FatalErrorsController()
