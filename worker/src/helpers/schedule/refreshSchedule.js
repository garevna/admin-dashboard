import { get } from '../AJAX'
import { clearStore } from '../db'
import { putScheduleRecord } from '../db/schedule'
import { refreshScheduleError, putScheduleRecordError } from '../error-handlers'

export const refreshSchedule = async function () {
  const [route, action] = ['schedule', 'refresh']

  clearStore('schedule')

  const { status, result } = await get('scheduling')

  if (status !== 200) return refreshScheduleError(status)

  for (const record of result) {
    if ((await putScheduleRecord(record)).status !== 200) self.postMessage(putScheduleRecordError(500))
  }

  return { status: 200, route, action, result }
}
