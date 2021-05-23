import { putScheduleRecord } from '../db/schedule'
import { put } from '../AJAX'

import { invalidRequest } from '../errors'
import { updateStatusError } from '../error-handlers'

import {
  getWeekNumber,
  getWeekStartDate,
  getWeekEndDate
} from 'garevna-date-functions'

export async function updateSchedule (request) {
  const [route, action] = ['schedule', 'update']

  const { _id, resellerId, customerId, serviceId, status } = request

  // self.postMessage({ status: 300, route, action, request })

  if (!_id || !resellerId || !customerId || !serviceId || !status) return invalidRequest(route, action, 'Schedule update request')

  if (status === 'in job queue') {
    if (!request.installation || !request.installation.date) return invalidRequest(route, action, 'Schedule update request')

    const { installation } = request
    request.weekNumber = getWeekNumber(installation.date)
    request.weekDetails = {
      start: getWeekStartDate(installation.date),
      end: getWeekEndDate(installation.date)
    }
  } else {
    request.weekNumber = getWeekNumber(new Date())
    request.weekDetails = {
      start: getWeekStartDate(new Date()),
      end: getWeekEndDate(new Date())
    }
  }

  request.modified = Date.now()

  if ((await put(`scheduling/${_id}`, request)).status !== 200) return updateStatusError(500, route, action, true)

  if ((await putScheduleRecord(request)).status !== 200) return updateStatusError(500, route, action, false)

  return { status: 200, route, action, result: request }
}
