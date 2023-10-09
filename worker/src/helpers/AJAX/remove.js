import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler
} from '../env'

export const remove = async (path) => {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: Operation failed. Try later' }

  const response = await fetch(`${hostHandler()}/${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    }
  })

  return { status: response.status, result: await response.json() }
}
