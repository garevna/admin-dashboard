import { secretHandler, hostHandler, apiKeyHandler } from '../env'

export const init = (data) => {
  if (self.initialized) return
  const [route, action] = ['crypto', 'init']
  if (!data.host || !data.key || !data.secret) {
    return {
      status: 422,
      route,
      action,
      error: true,
      errorType: 'Init application',
      result: 'Invalid init request: Insufficient data to start the app'
    }
  }
  secretHandler(data.secret)
  hostHandler(data.host)
  apiKeyHandler(data.key)

  self.initialized = true

  return {
    status: 200,
    route,
    action,
    result: { secret: secretHandler(), host: hostHandler(), apiKey: apiKeyHandler() }
  }
}
