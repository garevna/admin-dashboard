import { put } from '../AJAX'
import { putRecordByKey } from '../db'

const { putTicketDataError } = require('../error-handlers').default

export const putTicketData = async function (key, data) {
  const { _id, files } = data

  self.postMessage({ status: 300, route: 'tickets', action: 'put', key, _id, files })

  const { result: ticket } = self.getTicketData(_id)

  Object.assign(ticket, { files })

  const { status, result } = await put(`ticket/${_id}`, data)

  if (status !== 200) return putTicketDataError(status)

  const { status: localStatus } = await putRecordByKey('tickets', _id, data)

  if (localStatus !== 200) return putTicketDataError(status)

  return { status, route: 'tickets', action: 'put', key: _id, result }
}
