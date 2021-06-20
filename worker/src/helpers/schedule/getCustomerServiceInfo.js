// import { get } from '../AJAX'
import { putRecordByKey } from '../db'

export const getCustomerServiceInfo = async (customerId, serviceId) => {
  const { result: serviceDetails } = await self.getServiceDetails(serviceId)
  if (!serviceDetails) return { status: 404 }
  // const { result: customerDetails } = await self.getCustomer(customerId)
  const { result: customerDetails } = await self.refreshCustomer(customerId)
  if (!customerDetails) return { status: 404 }

  const {
    _id,
    uniqueCode,
    firstName,
    lastName,
    address,
    apartmentNumber,
    phoneMobile,
    phoneWork,
    resellerId
  } = customerDetails

  const service = customerDetails.services.find(item => item.id === serviceId)
  if (!service) return { status: 404 }

  service.lots = service.lots || []
  service.installation = service.installation || {}

  if ((service.status === 'Awaiting for confirmation' || service.status === 'Awaiting confirmation') && (!service.lots || !service.lots.length)) {
    service.status = 'Awaiting for scheduling'
  }

  self.postMessage(await putRecordByKey('customers', _id, customerDetails))

  return {
    status: 200,
    result: {
      resellerId,
      customer: {
        uniqueCode,
        name: `${firstName} ${lastName}`,
        address: `${apartmentNumber}/${address}`,
        phone: phoneMobile || phoneWork
      },
      service: Object.assign(service, { name: serviceDetails.serviceName })
    }
  }
}
