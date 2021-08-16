import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler
} from '../env'

export const post = async (path, data) => {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: Data has not been saved. Try later' }

  self.postDebugMessage({ path, data })

  const response = await fetch(`${hostHandler()}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify(data)
  }).catch(response => self.postMessage(Object.assign(response, {
    error: true,
    errorType: 'Remote server error',
    errorMessage: 'Look for server settings please'
  })))

  return { status: response.status, result: await response.json() }
}
