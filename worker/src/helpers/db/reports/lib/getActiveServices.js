import { getServiceDate } from './getServiceDate'

export const getActiveServices = services => !services ? [] : services
  .filter(service => service.status === 'Active')
  .map(service => ({ serviceId: service.id, date: getServiceDate(service) }))
