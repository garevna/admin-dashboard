const getCustomersByBuildingId = require('../overviewHelpers/getCustomersByBuildingId')
const calculateDynamic = require('./calculateDynamic')
const { getServices, getConnections, filterForPendingServices, calculateChurn } = require('../lib')

module.exports = async function (customerStoreIndex, serviceStore, reportRecord) {
  const customers = await getCustomersByBuildingId(customerStoreIndex, reportRecord._id)

  const recordServices = customers
    .flatMap(customer => customer.services.map(service => Object.assign(service, {
      customerId: customer._id,
      resellerId: customer.resellerId,
      status: service.status,
      activationDate: service.activationDate?.slice(0, 7)
    })) || [])

  const dynamic = await calculateDynamic(serviceStore, recordServices.filter(record => record.status === 'Active'))

  const [services, connections, pending, churn] = [
    getServices(dynamic),
    getConnections(dynamic),
    filterForPendingServices(dynamic),
    calculateChurn(recordServices)
  ]

  return Object.assign(reportRecord, { dynamic, connections, services, pending, churn })
}
