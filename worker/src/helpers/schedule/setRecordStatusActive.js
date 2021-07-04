import { removeScheduleRecord } from '../db/schedule'

export const setRecordStatusActive = async (request) => {
  const { customerId, serviceId } = request

  // self.postDebugMessage({ method: 'setRecordStatusActive', request })
  const result = await Promise.all([
    removeScheduleRecord(customerId, serviceId),
    self.updateScheduleLots(),
    self.updateCustomerServiceStatus(Object.assign(request, { status: 'Active' }))
  ])

  self.postDebugMessage({ method: 'setRecordStatusActive', result })

  // return await self.buildSchedule()
  return {
    status: 200,
    route: 'schedule',
    action: 'activate',
    message: true,
    messageType: 'Installation schedule',
    messageText: 'Service has been activated'
  }
}
