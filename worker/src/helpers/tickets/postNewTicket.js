import { post } from '../AJAX'
import { postNewTicketError } from '../error-handlers'
import { getFromRemoteServer, getFromLocalDb } from './'
// import { putRecordByKey } from '../db'

export const postNewTicket = async function (data) {
  const { data: ticket } = data

  // self.postMessage({ status: 300, route: 'tickets', action: 'post', result: ticket })

  const { status, result } = await post('ticket', ticket)

  // self.postMessage({ status: 300, route: 'tickets', action: 'post', result: { status, ...result } })

  if (status !== 200) return postNewTicketError(status)

  self.postMessage({
    status: 200,
    route: 'tickets',
    action: 'post',
    message: true,
    messageType: 'Tickets',
    messageText: 'New ticket has been created'
  })

  const { data: newTicket } = result

  self.postMessage({ status: 300, route: 'tickets', action: 'new ticket', result: newTicket })

  // self.postMessage({ status: 300, route: 'tickets', action: 'post', result })

  const { status: refreshStatus, result: refreshResult } = await getFromRemoteServer()

  self.postMessage({ status: 300, route: 'tickets', action: 'refresh', result: { status: refreshStatus, result: refreshResult } })

  const { status: getStatus, result: getResult } = await getFromLocalDb()

  self.postMessage({ status: 300, route: 'tickets', action: 'list', result: getResult })

  return getStatus !== 200 ? postNewTicketError(getStatus) : ({ status: 200, route: 'tickets', action: 'list', result: getResult })

  // const { status: localStatus } = await putRecordByKey(id, data)

  // if (localStatus !== 200) return postNewTicketError(status)

  // return { status, route: 'tickets', action: 'post', key: newTicket._id, result }
}
