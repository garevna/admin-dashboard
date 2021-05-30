import { updateScheduleRecord, updateScheduleLots, getSchedule } from './'
import { updateCustomerServiceStatus } from '../customers'

export const moveRecordToJobQueue = async (request) => {
  await Promise.all([
    updateScheduleRecord(request.record),
    updateScheduleLots(),
    updateCustomerServiceStatus(request.record)
  ])

  return { status: 200, route: 'schedule', action: 'job', result: (await getSchedule()).result }
}
