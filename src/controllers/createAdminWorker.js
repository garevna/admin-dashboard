import { adminWorkerEvents } from './events'
import { adminWorkerErrors } from './errors'
import { initCallback, startRefreshing, refreshCallback, showDebugMessage } from './callbacks'

export function createAdminWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('admin.worker')] = new Worker(`${path}admin.worker.js`)

  window[Symbol.for('admin.worker')].onerror = function (error) {
    console.warn('Admin worker Error\n', error)
  }

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('admin.worker')]

  window[Symbol.for('admin.worker')].onmessage = function (event) {
    if (!event.data) {
      event.stopImmediatePropagation()
      return console.warn('Worker message event error: event data not defined')
    }

    if (event.data.status === 300) return showDebugMessage(event.data)

    if (event.data.action === 'init') {
      event.stopImmediatePropagation()
      return initCallback(event)
    }

    if (event.data.action === 'redirect') {
      event.stopImmediatePropagation()
      startRefreshing(event)
    }

    if (event.data.action === 'refresh') return refreshCallback(event)

    const { route, action, status, result } = event.data

    if (status === 200) {
      window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
      // console.log('ROUTE: ', route, ' ACTION: ', action)
      if (!adminWorkerEvents[route] || !adminWorkerEvents[route][action]) {
        return /* console.log(event.data) */
      }
      const eventName = adminWorkerEvents[route][action]
      // console.log(eventName)
      if (eventName) {
        window[Symbol.for('vue.instance')].$root.$emit(eventName, result)
      }

      if (event.data.message) {
        // console.log('ADMIN WORKER ON MESSAGE - MESSAGE RECEIVED')
        window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', {
          messageType: event.data.messageType || event.data.route.toUpperCase(),
          messageText: event.data.messageText || 'Success'
        })
      }
    } else {
      event.stopImmediatePropagation()
      window[Symbol.for('vue.prototype')].$dispatchProgressEvent(false)
      // console.warn('ADMIN WORKER ON MESSAGE - ERROR STATUS RECEIVED', status, route, action, event.data)
      const { errorType = event.data.route, errorMessage = 'Unknown error' } = event.data.error ? event.data : adminWorkerErrors[route][action]

      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType,
        errorMessage
      })
    }
  }
}
