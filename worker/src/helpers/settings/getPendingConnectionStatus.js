import { pendingConnectionStatusHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'pendingConnectionStatus']

export const getPendingConnectionStatus = () => ({
  status: 200,
  route,
  action,
  section,
  result: pendingConnectionStatusHandler()
})
