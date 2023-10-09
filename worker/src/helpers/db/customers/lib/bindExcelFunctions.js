import { testCustomerForExportFilters } from './testCustomerForExportFilters'
import { createSimpleFieldsForExport } from './createSimpleFieldsForExport'
import { getServiceDetails } from './getServiceDetails'

export const bindExcelFunctions = async options => {
  const { fields, buildingId, partnerId, serviceStatus } = options
  const { simple: simpleFields, special: specialFields } = fields

  const { result: serviceList } = await self.getServicesShortList()
  const { result: partnerList } = await self.getResellersShortList()

  return {
    testCustomer: testCustomerForExportFilters.bind(null, buildingId, partnerId, serviceStatus),
    getService: getServiceDetails.bind(null, serviceList, specialFields),
    createCustomerFields: createSimpleFieldsForExport.bind(null, partnerList, simpleFields)
  }
}
