import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

import { loginHandler, passwordHandler } from '@/controllers/data-handlers'

const [route, action] = ['admin', 'auth']

export const auth = function (resolve, reject) {
  if (!loginHandler() || !passwordHandler()) {
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      errorType: 'Authorization',
      ErrorMessage: 'Login and password required'
    })
    return
  }

  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route,
    action,
    login: loginHandler(),
    password: passwordHandler()
  })

  eventsTable[admin.redirect] = resolve
  eventsTable[admin.failure] = reject
  eventsTable[admin.auth] = reject
}
