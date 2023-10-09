import { getAllRecords } from '../db'

const [route, action] = ['services', 'partner']

export const getPartnerServices = async function (partnerId) {
  const { status, result: services } = await getAllRecords('services')

  if (status !== 200) self.errorMessage('getServicesListError')

  const result = services
    .filter(service => service.partners.includes(partnerId))
    .map(service => ({
      id: service._id,
      name: service.serviceName,
      type: service.serviceType,
      subscriptionFee: service.subscriptionFee,
      speed: `${service.upstreamSpeed}/${service.downstreamSpeed}`
    }))

  return { status, route, action, result }
}
