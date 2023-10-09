import { manualCustomerCreation } from './manualCustomerCreation'

export function createEmptyCustomer () {
  if (!this.resellerId) return console.warn('Partner is not defined.')
  manualCustomerCreation(this.resellerId)
}
