import { testCustomerForFatalErrors } from './'

export function testForFatalErrors (customers) {
  const fatalErrors = []

  customers.forEach((customer, index) => {
    const customerFatalErrors = testCustomerForFatalErrors(customer, index)
    customerFatalErrors?.length && fatalErrors.push(...customerFatalErrors)
  })

  return fatalErrors
}
