import { deleteScheduleRecord } from '../db/schedule'
import { remove } from '../AJAX'

import { invalidRequest } from '../errors'
import { deleteScheduleRecordError } from '../error-handlers'

export async function removeScheduleRecord (id) {
  const [route, action] = ['schedule', 'delete']

  if (!id) return invalidRequest(route, action, 'Schedule record delete request')

  if ((await remove(`scheduling/${id}`)).status !== 200) return deleteScheduleRecordError(500, route, action, true)

  if ((await deleteScheduleRecord(id)).status !== 200) return deleteScheduleRecordError(500, route, action, false)

  return { status: 200, route, action, result: `deleted: ${id}` }
}
