import { put } from '../AJAX'
import { getRecordByKey, putRecordByKey } from '../db'

export const putTicketData = async function (_id, message) {
  const { status: getStatus, result: ticket } = await getRecordByKey('tickets', _id)

  if (getStatus !== 200) return self.errorMessage('getTicketDataError')

  if (!ticket.history) ticket.history = []

  ticket.history.push({
    date: new Date().toISOString().slice(0, 10),
    responder: 'admin',
    message
  })

  const { status, result } = await put(`ticket/${_id}`, ticket)

  if (status !== 200) return Object.assign(self.errorMessage('putTicketDataError'), result)

  const { status: localStatus } = await putRecordByKey('tickets', _id, ticket)

  if (localStatus !== 200) return self.errorMessage('putTicketDataError')

  return { status, route: 'tickets', action: 'put', key: _id, result }
}
