import { loginHandler, passwordHandler } from '@/controllers/data-handlers'

export const auth = function () {
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
}
