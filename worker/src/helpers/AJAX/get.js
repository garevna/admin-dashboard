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

function errorCallback (status, path) {
  const errorType = status === 403 ? 'Access denied' : 'Error fetching the data from remote server'
  const errorMessage = status === 403
    ? `Forbidden resource: ${hostHandler()}/${path}`
    : `Attempt to get resource ${hostHandler()}/${path} failed`
  // self.postMessage({
  //   status,
  //   route: '*',
  //   action: 'fetch',
  //   error: true,
  //   errorType,
  //   errorMessage
  // })
  return {
    status,
    result: null,
    error: true,
    errorType,
    errorMessage
  }
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

  return response.status !== 200 || (!data && !file)
    ? Object.assign(errorCallback(response.status, path), { page, pages })
    : { status: 200, result: data || file, page, pages }
}
