import { post } from '../AJAX'

export const postNewTicket = async function (data) {
  const { data: ticket } = data

  if ((await post('ticket', ticket)).status !== 200) return self.errorMessage('postNewTicketError')

  self.postMessage({
    status: 200,
    route: 'tickets',
    action: 'post',
    message: true,
    messageType: 'Tickets',
    messageText: 'New ticket has been created'
  })

  if ((await self.getTicketsFromRemoteServer()).status !== 200) return self.errorMessage('refreshTicketsListError')

  const { status, result } = await self.getFromLocalDb()

  return status !== 200 ? self.errorMessage('postNewTicketError') : ({ status: 200, route: 'tickets', action: 'list', result })
}
