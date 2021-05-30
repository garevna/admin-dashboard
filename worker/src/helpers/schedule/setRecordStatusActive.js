import { removeScheduleRecord, updateScheduleLots, getSchedule } from './'
import { updateCustomerServiceStatus } from '../customers'

export const setRecordStatusActive = async (request) => {
  await Promise.all([
    removeScheduleRecord(request._id),
    updateScheduleLots(),
    updateCustomerServiceStatus(Object.assign(request, { status: 'Active' }))
  ])

  return { status: 200, route: 'schedule', action: 'job', result: (await getSchedule()).result }
}
