import { mapWorkerEvents } from './events'
import { mapWorkerErrors } from './errors'

const readyEventHandler = function (event) {
  if (event.data.action === 'init') {
    console.log('MAP WORKER INIT')
    event.stopImmediatePropagation()
    window[Symbol.for('map.worker')].ready = true
    window[Symbol.for('vue.instance')].$root.$emit('footprint-ready', true)
    window[Symbol.for('map.worker')].removeEventListener('message', readyEventHandler)
  }
}

export function createMapWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('map.worker')] = new Worker(`${path}map.worker.js`)

  window[Symbol.for('map.worker')].onerror = function (error) {
    console.warn('Map worker Error\n', error)
  }

  // window[Symbol.for('map.worker')].postMessage({ action: 'host', host: window[Symbol.for('api.host')] })

  window[Symbol.for('map.worker')].addEventListener('message', readyEventHandler)

  window[Symbol.for('map.worker')].onmessage = function (event) {
    // console.log(event.data)
    if (!event.data) {
      event.stopImmediatePropagation()
      return
    }

    if (event.data.status === 300) return console.log('MAP WORKER DEBUGGING MESSAGE:\n', event.data)

    const { action, status } = event.data
    if (action === 'store') return

    if (status === 200) {
      const eventName = mapWorkerEvents[action]
      window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
      eventName && window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)
    } else {
      if (action === 'init' || action === 'search') return
      const { type: errorType, message: errorMessage } = mapWorkerErrors[action]()
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType,
        errorMessage
      })
    }
  }
}
