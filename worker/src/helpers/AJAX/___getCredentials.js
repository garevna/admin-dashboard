import { hostHandler } from '../env'

export const getCredentials = async function () {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode' }

  const [route, action] = ['rsp', 'credentials']

  const response = await fetch(`${hostHandler()}/credentials`)
  const result = (await (response.json())).data

  if (response.status !== 200) {
    return {
      status: response.status,
      route,
      action,
      result,
      error: true,
      errorType: 'Authentification error',
      errorMessage: 'Invalid credentials'
    }
  }

  return { status: 200, route, action, result }
}
