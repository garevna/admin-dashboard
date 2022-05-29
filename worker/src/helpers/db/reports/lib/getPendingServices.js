import { getServiceDate } from './getServiceDate'

import { pendingConnectionStatusHandler } from '../handlers'

export const getPendingServices = services => !services ? [] : services
  .filter(service => pendingConnectionStatusHandler().admin.includes(service.status))
  .map(service => ({ serviceId: service.id, date: getServiceDate(service) }))
