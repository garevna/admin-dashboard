import { get } from '../../AJAX'

const [route, action] = ['notifications', 'date']

export const getNotifications = async (date = new Date().toISOString().slice(0, 10)) => {
  const { result } = await get('local-storage')

  const { created, modified, ...notifications } = result

  return {
    status: 200,
    route,
    action,
    result: notifications[date] || []
  }
}
