import { parseDate, getServices, getKey } from './'

export const importedCustomerCreation = (customer, resellerId = null) => {
  const findKey = getKey.bind(null, Object.keys(customer))

  const [
    uniqueCodeKey,
    apartmentNumberKey,
    addressKey,
    customerCreationDateKey,
    firstNameKey,
    lastNameKey,
    companyAbnKey,
    companyNameKey,
    primaryEmailKey,
    alternativeEmailKey,
    phoneMobileKey,
    phoneWorkKey,
    postCodeKey
  ] = [
    findKey(['unique', 'code']),
    findKey(['apartment', 'number']) || findKey(['apt', 'number']) || findKey(['apartment']),
    findKey(['address']),
    findKey(['creation', 'date']),
    findKey(['first', 'name']),
    findKey(['last', 'name']),
    findKey(['company', 'abn']) || findKey(['business', 'abn']),
    findKey(['company', 'name']) || findKey(['business', 'name']),
    findKey(['primary', 'email']),
    findKey(['alternative', 'email']),
    findKey(['phone', 'mob']),
    findKey(['phone', 'work']),
    findKey(['post', 'code'])
  ]

  const [customerCreationDate, address] = [
    parseDate(customer[customerCreationDateKey]),
    customer[addressKey] ? customer[addressKey].toUpperCase() : ''
  ]

  const [companyAbn, companyName] = [customer[companyAbnKey], customer[companyNameKey]]
  const commercial = companyAbn || companyName ? { companyAbn, companyName } : null

  return {
    customerCreationDate,
    commercial,
    resellerId,
    buildingId: null,
    uniqueCode: customer[uniqueCodeKey],
    address,
    apartmentNumber: customer[apartmentNumberKey],
    firstName: customer[firstNameKey],
    lastName: customer[lastNameKey],
    primaryEmail: customer[primaryEmailKey],
    alternativeEmail: customer[alternativeEmailKey],
    phoneMobile: customer[phoneMobileKey],
    phoneWork: customer[phoneWorkKey],
    postCode: customer[postCodeKey],
    services: getServices(customer)
  }
}
