import { eventsTable } from '@/controllers/events-table'
import { admin } from '@/controllers/events'

import { loginHandler, passwordHandler } from '@/controllers/data-handlers'

export const auth = function (callback) {
  if (!loginHandler() || !passwordHandler()) {
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      errorType: 'Authorization',
      ErrorMessage: 'Login and password required'
    })
    return
  }

  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'admin',
    action: 'auth',
    login: loginHandler(),
    password: passwordHandler()
  })

  eventsTable[admin.redirect] = callback
}
