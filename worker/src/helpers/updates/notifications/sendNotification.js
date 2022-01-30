import {
  hostHandler,
  apiKeyHandler
} from '../../env'

const [route, action] = ['notifications', 'send']

export const sendNotification = async (partnerId, target, targetId, details = '') => {
  const date = new Date().toISOString().slice(0, 10)

  const { result: partnerCredentials } = await self.getPartnerCredentials(partnerId)

  const storage = await (await fetch(`${hostHandler()}/local-storage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKeyHandler(),
      Credentials: partnerCredentials.result
    }
  })).json()

  const item = storage.data[date] || []

  item.push({
    created: Date.now(),
    target,
    id: targetId,
    details
  })

  const response = await fetch(`${hostHandler()}/local-storage`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKeyHandler(),
      Credentials: partnerCredentials.result
    },
    body: JSON.stringify({ [date]: item })
  })

  return { status: response.status, route, action, result: await response.json() }
}
