import { BaseController } from './'
import { testCustomerForWarnings, testForWarnings } from '../helpers'

class WarningsController extends BaseController {
  constructor () {
    super('warnings')
  }

  getWarning (index, propName, key) {
    return this.items.find(warn => warn.index === index && warn.propName === propName && warn.key === key)
  }

  testCustomer (customer, index) {
    this.removeAllCustomerRecords(index)
    this.add(testCustomerForWarnings(customer, index))
    this.emitEvent()
  }

  test (customers) {
    this.items = testForWarnings(customers)
    this.emitEvent()
  }
}

export const warningsController = new WarningsController()
