import { get, put } from '../../AJAX'

const [route, action] = ['notifications', 'reset']

export const resetNotificationsByDate = async (partnerId, date) => {
  const { result: storage } = await get('local-storage')

  delete storage.data[date]

  const response = await put('local-storage', storage)

  return { status: response.status, route, action, result: response.result }
}
