export function extractCustomerDataForList (customer) {
  const {
    customerCreationDate,
    firstName,
    lastName,
    uniqueCode,
    address,
    apartmentNumber,
    services = [],
    _id: id,
    resellerId,
    commercial
  } = customer

  return {
    id,
    activationDates: services.map(service => service.activationDate ? service.activationDate.slice(0, 7) : ''),
    commercial,
    resellerId,
    customerCreationDate,
    name: `${firstName} ${lastName}`,
    uniqueCode,
    address: `${apartmentNumber}/${address}`,
    services: services.map(service => service.id)
  }
}
