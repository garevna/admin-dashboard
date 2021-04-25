import * as actions from './actions'
import { events } from './events.config'
import { addWorkerListener } from './'

console.log('Actions:\n', actions)
console.log('Events:\n', events)

export const createController = function () {
  window[Symbol.for('vue.prototype')].$dispatchProgressEvent = function (value) {
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', value)
  }

  window[Symbol.for('vue.prototype')].$sendMessageToWorker = function (message) {
    const { route, action, ...data } = message
    console.log('Send message to worker:\n', route, action, data)
    window[Symbol.for('vue.prototype')].$dispatchProgressEvent(true)
    window[Symbol.for('vue.prototype')].__worker.postMessage({ route, action, ...data })
  }

  window[Symbol.for('admin.worker')].addEventListener('message', function (event) {
    if (event.data.error) {
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType: event.data.errorType || event.data.route,
        errorMessage: event.data.errorMessage || 'Unknown error'
      })
    }
    if (event.data.message) {
      window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', {
        messageType: event.data.messageType || event.data.route,
        messageText: event.data.messageText || 'Success'
      })
    }
  })

  Object.keys(actions).forEach(key => Object.assign(window[Symbol.for('vue.prototype')], {
    [`__${key}`]: actions[key]
  }))

  Object.keys(events)
    .forEach(route => Object.keys(events[route]).forEach(action => addWorkerListener(route, action)))
}
