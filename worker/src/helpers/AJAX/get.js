import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler
} from '../env'

export const get = async function (path) {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: operation is impossible' }

  const response = await fetch(`${hostHandler()}/${path}`, {
    method: 'GET',
    headers: {
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    }
  })

  const { page, pages, data: result } = await response.json()

  if (response.status !== 200 || !result) {
    return {
      status: response.status,
      page,
      pages,
      result: 'Error fetching the data from remote server'
    }
  }

  return { status: 200, result, page, pages }
}
