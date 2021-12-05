import { eventsTable } from './events-table'

import {
  initCallback,
  refreshCallback,
  debuggerCallback,
  startRefreshing,
  errorCallback,
  messageCallback
} from '@/controllers/callbacks'

import * as events from './events'

export const globalCallback = function (event) {
  const { route, action, section, status, result, error, message } = event.data

  if (status === 300) return debuggerCallback(event)

  if (error || message) error ? errorCallback(event) : messageCallback(event)

  // console.log('GLOBAL CALLBACK:\n', route, action, section, status, result, error, message)

  if (action === 'init') return initCallback(event)

  if (action === 'initial-refresh') return refreshCallback(event)

  window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)

  const eventName = route === 'settings' && action === 'get' ? events[route][action][section] : events[route][action]

  if (!eventsTable[eventName]) {
    // console.log('EVENTS TABLE:\n', eventsTable)
    // console.log('ROUTE AND ACTION:\n', route, action)
    // console.log('EVENT NAME: ', eventName)
    return console.warn('Unknown event', route, action, event.data)
  }
  if (typeof eventsTable[eventName] !== 'function') return console.warn('Error: callback is not a function', eventName, event.data)

  eventsTable[eventName](result)
  if (action === 'redirect') startRefreshing(event, refreshCallback)

  delete eventsTable[eventName]
}
