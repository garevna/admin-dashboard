import { customerCreation } from './customerCreation'

export function create (customer) {
  return customerCreation(customer, this.resellerId)
}
