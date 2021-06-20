import { remove } from '../AJAX'
import { putScheduleRecord } from '../db/schedule'

const { putScheduleRecordError } = require('../error-handlers').default

const scheduleStatuses = ['Awaiting for confirmation', 'Awaiting confirmation', 'In job queue']

export const buildScheduleRecord = async (data) => {
  const { _id, customerId, serviceId } = data
  const record = { _id, customerId, serviceId }

  const { status: customerServiceStatus, result } = await self.getCustomerServiceInfo(customerId, serviceId)

  if (customerServiceStatus === 404) return Object.assign(await remove(`scheduling/${record._id}`), { status: 404 })

  const { customer, service, resellerId } = result

  if (service.status === 'Active' || service.status === 'Not connected') return Object.assign(await remove(`scheduling/${record._id}`), { status: 0 })

  if (service.status === 'Awaiting for confirmation' || service.status === 'Awaiting confirmation') {
    if (!Array.isArray(service.lots) || !service.lots[0] || !service.lots[1]) {
      await self.updateCustomerServiceStatus({
        customerId,
        serviceId,
        status: 'Awaiting for scheduling',
        lots: [],
        installation: {}
      })
      service.status = 'Awaiting for scheduling'
    }
  }

  record.request = scheduleStatuses.includes(service.status) ? 'scheduling' : 'booking'

  const { status, name: serviceName, lots, installation, log, modified } = service
  Object.assign(record, { resellerId, customer, status, serviceName, lots, installation, log, modified })

  const date = record.request === 'booking' ? new Date(record.modified).toISOString().slice(0, 10)
    : record.status === 'In job queue' ? record.installation.date
      : new Date(Math.min(Date.parse(record.lots[0].date), Date.parse(record.lots[1].date))).toISOString().slice(0, 10)

  const weekNumber = self.getWeekNumber(date)

  Object.assign(record, {
    weekNumber,
    weekDetails: {
      start: self.getWeekStartDateByWeekNumber(self.getWeekNumber(weekNumber)),
      end: self.getWeekEndDateByWeekNumber(self.getWeekNumber(weekNumber))
    },
    weekDay: self.getWeekDay(new Date(date))
  })

  // self.postMessage({ status: 300, message: 'Schedule record', record: Object.assign(record, { customer }) })

  if ((await putScheduleRecord(record)).status !== 200) self.postMessage(putScheduleRecordError(500))
}
