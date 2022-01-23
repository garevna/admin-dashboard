import { removeScheduleRecord } from '../db/schedule'

export const setRecordStatusActive = async (request) => {
  const { customerId, serviceId } = request

  await Promise.all([
    removeScheduleRecord(customerId, serviceId),
    self.updateScheduleLots(),
    self.updateCustomerServiceStatus(Object.assign(request, { status: 'Active' }))
  ])

  return {
    status: 200,
    route: 'schedule',
    action: 'activate',
    message: true,
    messageType: 'Installation schedule',
    messageText: 'Service has been activated'
  }
}
