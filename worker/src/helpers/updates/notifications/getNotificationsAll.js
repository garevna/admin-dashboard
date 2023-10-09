import { get, put } from '../../AJAX'

const [route, action] = ['notifications', 'all']

export const getNotificationsAll = async () => {
  const { result } = await get('local-storage')

  const { created, modified, previous, ...notes } = result

  const notifications = Object.keys(notes).flatMap(key => notes[key])

  const targets = {}

  notifications.forEach(item => Object.assign(targets, { [`${item.target}.${item.id}`]: [] }))

  notifications.forEach(item => targets[`${item.target}.${item.id}`].push(item))

  const selected = Object.keys(targets).map(key => {
    const last = Math.max(...targets[key].map(item => item.created))
    return targets[key].filter(item => item.created === last)[0]
  })

  await put('local-storage', { previous: selected })

  return {
    status: 200,
    route,
    action,
    result: selected
  }
}
