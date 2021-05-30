import { put } from '../AJAX'
import { putTicketDataError } from '../error-handlers'
import { putRecordByKey } from '../db'

export const putTicketData = async function (key, data) {
  const { _id } = data

  // self.postMessage({ status: 300, route: 'tickets', action: 'put', result: { key: _id, data } })

  const { status, result } = await put(`ticket/${_id}`, data)

  if (status !== 200) return putTicketDataError(status)

  const { status: localStatus } = await putRecordByKey('tickets', _id, data)

  if (localStatus !== 200) return putTicketDataError(status)

  return { status, route: 'tickets', action: 'post', key: _id, result }
}
