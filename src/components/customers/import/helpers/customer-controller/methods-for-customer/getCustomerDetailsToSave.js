const customerProps = [
  'customerCreationDate',
  'commercial',
  'resellerId',
  'uniqueCode',
  'buildingId',
  'address',
  'apartmentNumber',
  'firstName',
  'lastName',
  'primaryEmail',
  'alternativeEmail',
  'phoneMobile',
  'phoneWork',
  'postCode'
]

export function getCustomerDetailsToSave (sourceData) {
  return Object.assign({}, ...customerProps.map(key => ({ [key]: sourceData ? sourceData[key] : this[key] })))
}
