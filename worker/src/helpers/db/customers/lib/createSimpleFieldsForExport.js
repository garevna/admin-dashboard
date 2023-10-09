export const createSimpleFieldsForExport = (partnerList, fields, customer) => {
  const result = {}
  for (const key of fields) {
    switch (key) {
      case 'partnerName':
        result[key] = partnerList.find(partner => partner.id === customer.resellerId)?.name
        break
      case 'fullName':
        result[key] = `${customer.firstName} ${customer.lastName}`
        break
      case 'address':
        result[key] = `${customer.apartmentNumber} ${customer.address}`
        break
      case 'companyName':
        result[key] = customer.commercial ? customer.commercial.companyName : ''
        break
      case 'companyAbn':
        result[key] = customer.commercial ? customer.commercial.companyAbn : ''
        break
      default:
        result[key] = customer[key]
    }
  }

  return result
}
