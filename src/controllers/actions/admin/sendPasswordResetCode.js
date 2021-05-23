import { codeHandler } from '@/controllers/data-handlers'

export const sendPasswordResetCode = function () {
  return new Promise((resolve) => {
    window[Symbol.for('vue.prototype')].$sendMessageToWorker({
      action: 'code',
      code: codeHandler()
    })
    window[Symbol.for('vue.instance')].$root.$on('')
  })
}
