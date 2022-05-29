import {
  hostHandler,
  apiKeyHandler,
  // credentialsHandler,
  defaultAdminCredsHandler
} from '../env'

function fetchErrorCallback (url) {
  console.warn(`Error fetching ${url}`)
  self.postMessage({
    status: 500,
    route: '*',
    action: 'fetch',
    error: true,
    errorType: `Error fetching ${url}\n`,
    errorMessage: 'Remote server sent invalid response headers'
  })
}

export const get = async function (path) {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: operation is impossible' }

  const response = await fetch(`${hostHandler()}/${path}`, {
    method: 'GET',
    headers: {
      Authorization: apiKeyHandler(),
      Credentials: defaultAdminCredsHandler(),
      'Content-Type': 'application/json;charset=utf-8',
      pragma: 'no-cash',
      'cache-control': 'no-cache'
    }
  }).catch(fetchErrorCallback.bind(null, `${hostHandler()}/${path}`))

  const { page, pages, data, file } = await response.json()

  if (response.status !== 200 || (!data && !file)) {
    return {
      status: response.status,
      page,
      pages,
      result: 'Error fetching the data from remote server'
    }
  }

  return { status: 200, result: data || file, page, pages }
}
