import { loginHandler } from '@/controllers/data-handlers'

export const resetPassword = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    action: 'reset',
    login: loginHandler()
  })
}
