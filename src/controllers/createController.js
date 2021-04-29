import * as actions from './actions'

export const createController = function () {
  window[Symbol.for('vue.prototype')].$dispatchProgressEvent = function (value) {
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', value)
  }

  window[Symbol.for('vue.prototype')].$sendMessageToWorker = function (message) {
    window[Symbol.for('vue.prototype')].$dispatchProgressEvent(true)
    window[Symbol.for('admin.worker')].postMessage(message)
  }

  Object.keys(actions).forEach(key => Object.assign(window[Symbol.for('vue.prototype')], {
    [`__${key}`]: actions[key]
  }))
}
