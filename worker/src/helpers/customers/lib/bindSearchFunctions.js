const testForPartner = (partnerId, customer) => partnerId ? customer.resellerId === partnerId : true

const testForActivationMonth = (month, customer) => month
  ? customer.services.filter(service => (service.activationDate && service.activationDate.slice(0, 7) === month)).length > 0
  : true

const testForType = (type, customer) => type
  ? type === 'commercial' ? !!customer.commercial : !customer.commercial
  : true

const testForServiceStatus = (status, customer) => status
  ? customer.services.filter(service => service.status === status).length > 0
  : true

const testForService = (serviceId, customer) => serviceId
  ? customer.services.filter(service => service.id === serviceId).length > 0
  : true

export const bindSearchFunctions = filters => {
  const { partnerId, serviceId, serviceStatus, serviceActivationMonth, type } = filters

  const testFunctions = {
    testForPartner: testForPartner.bind(null, partnerId),
    testForService: testForService.bind(null, serviceId),
    testForServiceStatus: testForServiceStatus.bind(null, serviceStatus),
    testForActivationMonth: testForActivationMonth.bind(null, serviceActivationMonth),
    testForType: testForType.bind(null, type)
  }

  return customer => Object.keys(testFunctions)
    .map(key => testFunctions[key](customer))
    .reduce((res, item) => res && item, true)
}
