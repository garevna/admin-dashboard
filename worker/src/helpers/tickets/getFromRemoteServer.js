import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
import { refreshTicketsListError } from '../error-handlers'

import { ticketCategories } from '../data-handlers'

export const getFromRemoteServer = async function () {
  const [route, action] = ['tickets', 'refresh']

  const { status, result } = await get('ticket')

  if (status !== 200) return refreshTicketsListError(status)

  const { ticketCategories: categories, tickets } = result

  ticketCategories(categories)

  await clearStore('tickets')

  for (const record of tickets) {
    const { status: localDBStatus } = await putRecordByKey('tickets', record._id, record)
    if (localDBStatus !== 200) self.postMessage(refreshTicketsListError(localDBStatus))
  }

  return { status, route, action, result }
}
