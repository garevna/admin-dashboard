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
  // let done = false
  do {
    const { status, pages, result } = await get(`ticket?year=${year}&month=${month}&per_page=50&page=${currentPage++}`)

    // self.postDebugMessage({ pages, lastMonthTickets: result })

    if (status !== 200) return remoteError

    let { tickets } = result
    var done = currentPage > pages || !tickets || !tickets.length

    // self.postDebugMessage({ modified: tickets.map(ticket => ticket.modified) })
    // self.postDebugMessage({ lastRequestTime: Date.now() - self.frequency - 1000 })
    // self.postDebugMessage({ updated: tickets.map(ticket => ticket.modified - (Date.now() - 1000 * 60 * 60 * 24)) })

    tickets = tickets.filter(ticket => ticket.modified > Date.now() - 1000 * 60 * 60 * 24 * 3)

    // self.postDebugMessage({ updatedTickets: tickets })

    const promises = tickets.map(ticket => putRecordByKey('tickets', ticket._id, ticket))
    /* const response = */ await Promise.all(promises)

    // self.postDebugMessage({ localTicketUpdates: response })

    updates.push(...tickets)
  } while (!done)

  // self.lastRequestTime = Date.now()

  return { status: 200, route, action, result: updates }
}
