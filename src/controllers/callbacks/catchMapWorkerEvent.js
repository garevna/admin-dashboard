import { mapWorkerErrors } from '../errors'
import { mapWorkerEvents } from '../events'
// import { refreshCallback } from './'

console.log('mapWorkerErrors:\n', mapWorkerErrors)

export const catchMapWorkerEvent = function (event) {
  console.log(event.data)
  if (event.data.status === 300) return console.log('MAP WORKER DEBUGGING MESSAGE:\n', event.data)

  const { action, status } = event.data
  console.log('==================================================\n', action, status)
  // if (action === 'refresh' && status === 200) return refreshCallback(event)

  const eventName = mapWorkerEvents[action]
  console.log('EVENT: ', eventName, action, status)

  if (status === 200) {
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
    eventName && window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)
  } else {
    if (action === 'init' || action === 'search') return
    const { type: errorType, message: errorMessage } = mapWorkerErrors[action]
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      errorType,
      errorMessage
    })
  }
}
