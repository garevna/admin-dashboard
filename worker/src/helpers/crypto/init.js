import { secretHandler, hostHandler, apiKeyHandler, defaultAdminCredsHandler } from '../env'

const [route, action] = ['crypto', 'init']

export const init = (data) => {
  if (self.initialized) return
  if (!data.host || !data.key || !data.defaultAdmin) {
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
  defaultAdminCredsHandler(data.defaultAdmin)

  self.refreshSettings()
    .then(response => self.postMessage(response))

  self.initialized = true

  return {
    status: 200,
    route,
    action,
    result: { secret: secretHandler(), host: hostHandler(), apiKey: apiKeyHandler(), defaultAdmin: defaultAdminCredsHandler() }
  }
}
