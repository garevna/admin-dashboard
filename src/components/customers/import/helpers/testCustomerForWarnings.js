import { connectionInfoWarnings } from '@/components/customers/import/helpers/customer-controller/connectionInfoWarnings'

export function testCustomerForWarnings (customer, index) {
  if (!customer) return console.warn('Test customer for warnings: Customer is not defined')

  const warnings = []
  const data = customer.services[0].connectionData || { Login: {}, PWD: {} }

  const address = customer.address ? `${customer.apartmentNumber}/${customer.address}` : 'Address not defined'

  for (const warn in connectionInfoWarnings) {
    const [propName, key] = connectionInfoWarnings[warn]
    const test = key ? !data[propName][key] : !data[propName]
    test && warnings.push({ index, propName, key, address, warning: `${propName} ${key} not defined` })
  }

  return warnings
}
