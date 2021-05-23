import { get, put } from '../AJAX'
import { clearStore } from '../db'
import { updateCustomerServiceStatus } from '../customers'
import { putScheduleRecord } from '../db/schedule'
import { refreshScheduleError, putScheduleRecordError } from '../error-handlers'

// import { getWeekNumber } from 'garevna-date-functions'

export const refreshSchedule = async function () {
  const [route, action] = ['schedule', 'refresh']

  clearStore('schedule')

  for (const path of ['scheduling/admin/booking', 'scheduling']) {
    // self.postMessage({ status: 300, path })
    const { status, result } = await get(path)
    // self.postMessage({ status: 300, message: 'SCHEDULE', result: { status, result } })
    if (status !== 200) return refreshScheduleError(status)
    for (const record of result) {
      // self.postMessage({ status: 300, message: 'SCHEDULE RECORD', record })
      const { customerId, serviceId, status: serviceStatus, lots } = record
      if ((serviceStatus === 'Awaiting confirmation' || serviceStatus === 'Awaiting for confirmation') && !lots.length) {
        record.status = 'Awaiting for scheduling'
        if ((await updateCustomerServiceStatus({ customerId, serviceId, serviceStatus: 'Awaiting for scheduling' })).status !== 200) {
          self.postMessage({ status: 300, title: 'ERROR UPDATING CUSTOMER SERVICE STATUS', record })
        }
        if ((await put(`scheduling/${record._id}`, record)).status !== 200) {
          self.postMessage({ status: 300, title: 'ERROR UPDATING SCHEDULE RECORD STATUS', record })
        }
      }
      if ((await putScheduleRecord(record)).status !== 200) self.postMessage(putScheduleRecordError(500))
      // self.postMessage({ status: 300, route, action, result: { status, record } })
    }
  }

  return { status: 200, route, action }
}
