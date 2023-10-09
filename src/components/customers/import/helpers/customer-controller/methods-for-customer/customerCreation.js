import { parseDate } from '@/helpers'
import { getServices } from '../../getServices'

export const customerCreation = (customer, resellerId) => {
  let { customerCreationDate, activationDate } = customer

  ;[customerCreationDate, activationDate] = [parseDate(customerCreationDate), parseDate(activationDate)]

  Object.assign(customer, { customerCreationDate, activationDate })

  const [companyAbn, companyName] = [
    customer.companyAbn || customer.businessAbn || customer.companyABN || customer.businessABN || '',
    customer.businessName || customer.companyName || ''
  ]
  const commercial = companyAbn || companyName ? { companyAbn, companyName } : null

  return {
    customerCreationDate,
    commercial,
    resellerId,
    buildingId: null,
    uniqueCode: customer.uniqueCode || customer.unique_code || customer['Unique code'],
    address: customer.address || '',
    apartmentNumber: customer.apartmentNumber || customer.aptNumber || '',
    firstName: customer.firstName || customer.first_name || customer['First name'] || '',
    lastName: customer.lastName || customer.last_name || customer['Last name'] || '',
    primaryEmail: customer.primaryEmail || customer.primary_email || customer['Primary email'] || '',
    alternativeEmail: customer.alternativeEmail || customer.alternative_email || customer['Alternative email'] || '',
    phoneMobile: customer.phoneMobile || customer.phone_mobile || customer['Phone mobile'] || '',
    phoneWork: customer.phoneWork || customer.phone_work || '',
    postCode: customer.postCode || customer.postalCode || customer.post_code || customer.postal_code || customer.Postcode || '',
    services: getServices(customer)
  }
}
