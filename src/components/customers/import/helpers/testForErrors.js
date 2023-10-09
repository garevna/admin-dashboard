import { testCustomerForErrors } from './'

export function testForErrors (customers) {
  const errors = []

  customers.forEach((customer, index) => {
    const customerErrors = testCustomerForErrors(customer, index)
    customerErrors?.length && errors.push(...customerErrors)
  })

  return errors
}
