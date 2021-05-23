import { openDB } from '../openDB'

import {
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber
} from 'garevna-date-functions'

import { putScheduleRecordError } from '../../error-handlers'

export async function putSchedule (data) {
  const [route, action] = ['schedule', 'put']

  const { weekNumber, resellerId, customerId, serviceId } = data

  if (!weekNumber || !resellerId || !customerId || !serviceId) {
    return {
      status: 422,
      route,
      action,
      result: null,
      error: true,
      errorType: 'Service delivery update',
      errorMessage: 'Invalid request: unsufficient data'
    }
  }

  const [start, end] = data.weekDetails

  Object.assign(data, {
    modified: data.modified || Date.parse(getWeekStartDateByWeekNumber(weekNumber)),
    weekDetails: {
      start: start || getWeekStartDateByWeekNumber(weekNumber),
      end: end || getWeekEndDateByWeekNumber(weekNumber)
    },
    request: data.request || 'booking',
    status: data.status || 'Awaiting for connection',
    lots: data.lots || null,
    installation: data.installation || null
  })

  const { result: db } = await openDB()
  const store = db.transaction('schedule', 'readwrite').objectStore('schedule')

  const { status, result } = await store.put(data._id, data)
  if (status !== 200) return putScheduleRecordError(status)

  return { status: 200, route, action, result }
}
