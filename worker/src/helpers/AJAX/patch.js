import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler
} from '../env'

export const patch = async (path, data) => {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: Data has not been saved. Try later' }

  const response = await fetch(`${hostHandler()}/${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (response.status !== 200) console.warn({ action: 'PATCH', url: `${hostHandler()}/${path}`, response: { status: response.status, result } })

  return { status: response.status, result }
}
