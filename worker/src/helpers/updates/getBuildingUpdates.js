// import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'buildings']

// const remoteError = Object.assign(remoteServerError, { route, action })

export const getBuildingUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  const updates = notifications.filter(item => item.target === 'building').map(note => note.id)

  return { status: 200, route, action, result: updates }
}
