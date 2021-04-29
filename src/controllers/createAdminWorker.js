import { adminWorkerEvents } from './events'
import { adminWorkerErrors } from './errors'

export function createAdminWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('admin.worker')] = new Worker(`${path}admin.worker.js`)
  window[Symbol.for('admin.worker')].onerror = function (error) {
    console.warn('Admin worker Error\n', error)
  }

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('admin.worker')]

  window[Symbol.for('admin.worker')].onmessage = function (event) {
    if (event.data.status === 300) return console.log('WORKER DEBUGGING MESSAGE:\n', event.data)

    if (event.data.action === 'init') return

    const { route, action, status, result } = event.data

    if (status === 200) {
      const eventName = adminWorkerEvents[route][action]
      console.log(eventName)
      window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
      window[Symbol.for('vue.instance')].$root.$emit(eventName, result)

      if (event.data.message) {
        window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', {
          messageType: event.data.messageType || event.data.route,
          messageText: event.data.messageText || 'Success'
        })
      }
    } else {
      const { errorType = event.data.route, errorMessage = 'Unknown error' } = event.data.error
        ? event.data : adminWorkerErrors[route][action]

      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType,
        errorMessage
      })
    }
  }
}
