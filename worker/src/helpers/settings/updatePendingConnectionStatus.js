import { pendingConnectionStatusHandler } from '../../data-handlers'
import { patch } from '../AJAX'

import { sendNotification } from '../updates'

const [route, action, section] = ['settings', 'update', 'pendingConnectionStatus']
const error = {
  error: true,
  errorType: 'Settings update',
  errorMessage: 'Failed to update list of pending connection status: remote server error'
}
const message = {
  message: true,
  messageType: 'Settings update',
  messageText: 'List of pending connection status updated'
}

export const updatePendingConnectionStatus = async (data) => {
  pendingConnectionStatusHandler(data)
  const { status, result } = await patch('settings', { pendingConnectionStatus: data })

  const response = { status, route, action, section, result }

  const { result: list } = await self.getResellersShortList()

  const partners = list.map(item => item.id)

  const promises = partners.map(partnerId => sendNotification(partnerId, 'settings', 'pendingConnectionStatus'))

  await Promise.all(promises)

  return status !== 200 ? Object.assign(response, error) : Object.assign(response, message)
}
