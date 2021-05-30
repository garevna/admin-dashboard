import { putScheduleRecord } from '../db/schedule'
import { put } from '../AJAX'

import { updateCustomerServiceStatus } from '../customers'

import { invalidRequest } from '../errors'
import { updateScheduleRecordError } from '../error-handlers'

export async function updateScheduleRecord (request) {
  const [route, action] = ['schedule', 'update']

  if (!request) return invalidRequest(route, action, 'Schedule update request')

  const { _id, resellerId, customerId, serviceId, status, lots, installation } = request

  if (!_id || !resellerId || !customerId || !serviceId || !status) return invalidRequest(route, action, 'Schedule update request')

  if (status === 'in job queue' && (!request.installation || !request.installation.date)) return invalidRequest(route, action, 'Schedule update request')

  const data = {
    resellerId,
    customerId,
    serviceId,
    status,
    modified: Date.now(),
    lots,
    installation
  }

  if ((await put(`scheduling/${_id}`, data)).status !== 200) return updateScheduleRecordError(500, route, action, true)

  if ((await updateCustomerServiceStatus(data)).status !== 200) return updateScheduleRecordError(500, route, action, true)

  if ((await putScheduleRecord(Object.assign(data, { _id }))).status !== 200) return updateScheduleRecordError(500, route, action, false)

  return { status: 200, route, action, result: request }
}
