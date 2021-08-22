const testBooking = service => self.serviceStatus.test(service.status, 'booking')
const testSchedule = service => self.serviceStatus.test(service.status, 'scheduling')
const requestType = service => testBooking(service) ? 'booking' : testSchedule(service) ? 'scheduling' : null

export const createScheduleRecordsForCustomer = (customer, services) => {
  const { uniqueCode, apartmentNumber, address, firstName, lastName, phoneWork, phoneMobile, _id: customerId } = customer

  services.forEach(item => item || self.postDebugMessage({ error: item }))

  const records = customer.services.filter(service => testBooking(service) || testSchedule(service))

  const result = []

  for (const record of records) {
    const { id, status, modified, lots, installation } = record

    const service = services.find(item => item ? item._id === id : false)

    if (!service) continue

    const { _id: serviceId, serviceName, serviceType } = service

    result.push({
      customerId,
      serviceId,
      serviceName,
      serviceType,
      status,
      modified,
      lots,
      installation,
      request: requestType(record),
      customer: {
        uniqueCode,
        address: `${apartmentNumber}/${address}`,
        name: `${firstName} ${lastName}`,
        phone: phoneWork || phoneMobile
      }
    })
  }

  return result
}
