export const testCustomerForExportFilters = (buildingId, partnerId, serviceStatus, customer) => (!buildingId || customer.buildingId === buildingId) &&
    (!partnerId || customer.resellerId === partnerId) &&
    (!serviceStatus || customer.services.filter(service => service.status === serviceStatus).length > 0)
