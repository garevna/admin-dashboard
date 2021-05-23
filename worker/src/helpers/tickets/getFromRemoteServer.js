import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
import { refreshTicketsListError } from '../error-handlers'

export const getFromRemoteServer = async function () {
  const [route, action] = ['tickets', 'refresh']

  const { status, result } = await get('ticket')

  if (status !== 200) return refreshTicketsListError(status)

  const { ticketCategories, tickets } = result

  // self.postMessage({ status: 300, route, action, result })

  await clearStore('tickets')

  const { status: categoryStatus } = await putRecordByKey('categories', 'ticketsCategories', ticketCategories)

  if (categoryStatus !== 200) return refreshTicketsListError(categoryStatus)

  for (const record of tickets) {
    const { status: localDBStatus } = await putRecordByKey('tickets', record._id, record)
    if (localDBStatus !== 200) self.postMessage(refreshTicketsListError(localDBStatus))
  }

  return { status, route, action, result }
}
