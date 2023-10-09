export function testCustomerForFatalErrors (customer, index) {
  const fatalErrors = []

  if (!customer) return console.warn('Test customer for fatal errors: Customer is not defined')

  const address = customer.address ? `${customer.apartmentNumber}/${customer.address}` : 'Address not defined!'

  if (!customer.services[0].id) fatalErrors.push({ key: 'serviceId', index, address, error: `Service ${customer.services[0].serviceName} not found!` })
  if (!customer.buildingId) fatalErrors.push({ key: 'buildingId', index, address, error: 'building not found!' })

  return fatalErrors
}
