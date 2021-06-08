import actions from './actions'

export const createController = function () {
  window[Symbol.for('vue.prototype')].$dispatchProgressEvent = function (value) {
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', value)
  }

  window[Symbol.for('vue.prototype')].$sendMessageToWorker = function (message) {
    window[Symbol.for('vue.prototype')].$dispatchProgressEvent(true)
    window[Symbol.for('admin.worker')].postMessage(message)
  }

  for (const key in actions) {
    Object.assign(window[Symbol.for('vue.prototype')], {
      [`__${key}`]: actions[key]
    })
  }
}
