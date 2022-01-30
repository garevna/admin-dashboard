import { get, put } from '../../AJAX'

const [route, action] = ['notifications', 'update']

export const resetNotificationsBeforeDate = async (date) => {
  const { result: storage } = await get('local-storage')

  Object.keys(storage)
    .filter(key => key < date)
    .forEach(key => delete storage[key])

  const response = await put('local-storage', storage)

  return { status: response.status, route, action, result: response.result }
}
