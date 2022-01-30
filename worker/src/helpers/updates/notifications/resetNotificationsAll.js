import { put } from '../../AJAX'

const [route, action] = ['notifications', 'clear']

export const resetNotificationsAll = async (partnerId) => {
  const { status, result } = await put('local-storage', {})

  return { status, route, action, result }
}
