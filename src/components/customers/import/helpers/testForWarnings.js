import { testCustomerForWarnings } from './'

export function testForWarnings (customers) {
  const warnings = []
  customers.forEach((customer, index) => {
    const customerWarnings = testCustomerForWarnings(customer, index)
    customerWarnings?.length && warnings.push(...customerWarnings)
  })

  return warnings
}
