import { openDB } from '../openDB'

import { getWeekStartDateByWeekNumber } from 'garevna-date-functions'

import { invalidRequest } from '../../errors'
// import { putScheduleRecordError } from '../../error-handlers'

export async function putScheduleRecord (data) {
  const [route, action] = ['schedule', 'update']

  // self.postMessage({ status: 300, title: 'PUT SCHEDULE RECORD', data })

  const {
    weekNumber,
    modified,
    request,
    resellerId,
    customerId,
    serviceId,
    status
  } = data

  if (!weekNumber || !request || !resellerId || !customerId || !serviceId || !status) return invalidRequest(route, action, 'Scheduling')

  if (!modified) data.modified = Date.parse(getWeekStartDateByWeekNumber(weekNumber)) + Math.round(Math.random() * 6)

  const { result: db } = await openDB()

  return new Promise((resolve) => {
    const transaction = Object.assign(db.transaction('schedule', 'readwrite'), {
      onerror: event => resolve({ status: event.target.errorCode, result: null }),
      oncomplete: event => resolve({ status: 200, result: event.target.result })
    })
    const store = transaction.objectStore('schedule')
    store.put(data)
  })
}
