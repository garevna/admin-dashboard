const testBooking = service => self.serviceStatus.test(service.status, 'booking')
const testSchedule = service => self.serviceStatus.test(service.status, 'scheduling')
const requestType = service => testBooking(service) ? 'booking' : testSchedule(service) ? 'scheduling' : null

export const createScheduleRecordsForCustomer = (customer, serviceList) => {
  const { uniqueCode, apartmentNumber, address, firstName, lastName, phoneWork, phoneMobile, _id: customerId } = customer

  const services = customer.services.filter(service => testBooking(service) || testSchedule(service))

  const result = []

  for (const service of services) {
    const { serviceName, serviceType } = serviceList.find(item => item ? item.serviceId === service.id : {})

    if (!serviceName || !serviceType) continue

    result.push(Object.assign({}, service, {
      customerId,
      serviceName,
      serviceType,
      request: requestType(service),
      customer: {
        uniqueCode,
        address: `${apartmentNumber}/${address}`,
        name: `${firstName} ${lastName}`,
        phone: phoneMobile || phoneWork
      }
    }))
  }

  return result
}
