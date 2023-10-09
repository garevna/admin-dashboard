import { requiredFields, messages } from './customer-controller/customerRequiredFields'

const testDate = (service) => {
  switch (service.status) {
    case 'Active':
      return service.activationDate
        ? null
        : { key: 'activationDate', error: 'Service activation date invalid or missing' }
    case 'Awaiting to be suspended':
      return service.activationDate && service.suspendDate
        ? null
        : !service.activationDate
          ? { key: 'activationDate', error: 'Service activation date should be defined before suspension' }
          : { key: 'suspendDate', error: 'Invalid or missing date when service should be suspended' }
    case 'Suspended':
      return service.activationDate && service.suspendedDate
        ? null
        : !service.activationDate
          ? { key: 'activationDate', error: 'Service activation date should be defined before suspension' }
          : { key: 'suspendedDate', error: 'Invalid or missing date of suspension' }
    case 'Awaiting for cancelation':
      return service.activationDate && service.cancelDate
        ? null
        : !service.activationDate
          ? { key: 'activationDate', error: 'Service activation date should be defined before cancelation' }
          : { key: 'cancelDate', error: 'Invalid or missing date when service should be canceled' }
    case 'Canceled':
      return service.activationDate && service.canceledDate
        ? null
        : !service.activationDate
          ? { key: 'activationDate', error: 'Service activation date should be defined before cancelation' }
          : { key: 'canceledDate', error: 'Invalid or missing date of cancelation' }
    default:
      return true
  }
}

export function testCustomerForErrors (customer, index, serviceIndex = 0) {
  if (!customer) return console.warn('Test customer for errors: Customer is not defined')
  const errors = []
  const address = customer.address ? `${customer.apartmentNumber}/${customer.address}` : 'Address not defined!'

  // const date = customer.services[serviceIndex].activationDate

  const dateError = testDate(customer.services[serviceIndex])

  // if (!date) errors.push({ key: 'activationDate', index, address, error: 'Service activation date invalid or missing' })

  if (dateError) errors.push(Object.assign(dateError, { index, address }))

  const customerErrors = requiredFields
    .map((key, num) => ({ index, key, address, error: `${messages[num]} required` }))
    .filter(record => !customer[record.key])

  customerErrors && Array.isArray(customerErrors) && errors.push(...customerErrors)

  return errors
}
