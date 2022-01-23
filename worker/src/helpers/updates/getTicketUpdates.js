import { get } from '../AJAX/get'
import { putRecordByKey } from '../db'

import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'tickets']
const remoteError = Object.assign(remoteServerError, { route, action })

export const getTicketUpdates = async () => {
  if (Date.now() - self.lastRequestTime < self.frequency) return []
  const updates = []
  let currentPage = 1
  const year = new Date().getFullYear().toString().slice(2)
  const month = new Date().getMonth() + 1
  do {
    const { status, pages, result } = await get(`ticket?year=${year}&month=${month}&per_page=50&page=${currentPage++}`)

    if (status !== 200) return remoteError

    let { tickets } = result
    var done = currentPage > pages || !tickets || !tickets.length

    tickets = tickets.filter(ticket => ticket.modified > Date.now() - 1000 * 60 * 60 * 24 * 3)

    const promises = tickets.map(ticket => putRecordByKey('tickets', ticket._id, ticket))
    await Promise.all(promises)

    updates.push(...tickets)
  } while (!done)

  return { status: 200, route, action, result: updates }
}
