import { get } from '../AJAX'
import { putRecordByKey } from '../db'

// import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'tickets']

// const remoteError = Object.assign(remoteServerError, { route, action })

export const getTicketUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  let promises = notifications
    .filter(item => item.target === 'ticket')
    .map(note => note.id)
    .map(id => get(`ticket/${id}`))

  const responses = await Promise.all(promises)

  responses
    .filter(response => response.status !== 200)
    .map(response => Object.assign(response, { route, action }))
    .forEach(response => self.postMessage(response))

  const tickets = responses
    .filter(response => response.status === 200)
    .map(response => response.result)

  promises = tickets.map(ticket => putRecordByKey('tickets', ticket._id, ticket))

  await Promise.all(promises)

  return { status: 200, route, action, result: tickets }
}
