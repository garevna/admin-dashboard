import { removeScheduleRecord } from '../db/schedule'

const [route, action] = ['schedule', 'activate']

export const setRecordStatusActive = async (record) => {
  const { customerId, serviceId } = record

  await Promise.all([
    removeScheduleRecord(customerId, serviceId),
    self.updateScheduleLots(),
    self.updateCustomerServiceStatus(Object.assign(record, { status: 'Active' }))
  ])

  return {
    status: 200,
    route,
    action,
    message: true,
    messageType: 'Installation schedule',
    messageText: 'Service has been activated'
  }
}
