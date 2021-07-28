import { patch } from '../AJAX'
import { putRecordByKey } from '../db'

export const putTicketData = async function (ticket) {
  const { status, result } = await patch(`ticket/${ticket._id}`, { history: ticket.history })

  if (status !== 200) return Object.assign(self.errorMessage('putTicketDataError'), result)

  const response = await putRecordByKey('tickets', ticket._id, ticket)

  if (response.status !== 200) return self.errorMessage('putTicketDataError')

  return {
    status,
    route: 'tickets',
    action: 'put',
    message: true,
    messageType: 'Ticket details',
    messageText: 'Response has been sent to partner'
  }
}
