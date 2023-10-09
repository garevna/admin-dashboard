import { eventsTable } from './events-table'

import {
  initCallback,
  settingsRefreshCallback,
  refreshCallback,
  debuggerCallback,
  startRefreshing,
  errorCallback,
  messageCallback,
  updatesCallback
  // adminCallback
} from '@/controllers/callbacks'

import * as events from './events'

export const globalCallback = function (event) {
  if (!event || !event.data || event.data.route === 'channel') return
  const { route, action, section, status, result, error, message } = event.data

  if (status === 300) return debuggerCallback(event)

  // if (route === 'debugger-console') {
  //   event.stopPropagation()
  //
  //   const { key, title, message } = event.data
  //
  //   console.log('debugger-console\n', { key, title, message })
  //
  //   window[Symbol.for('vue.instance')].$root
  //     .$emit('update-debugger-console-data', { key, title, message })
  //
  //   return
  // }

  if (error || message) error ? errorCallback(event) : messageCallback(event)

  if (route === 'updates') return updatesCallback(event)

  if (action === 'init') return initCallback(event)
  if (route === 'settings' && action === 'refresh') return settingsRefreshCallback(event)

  if (action === 'initial-refresh') return refreshCallback(event)

  if (route === 'schedule' && action === 'updated') {
    window[Symbol.for('vue.instance')].$root.$emit('schedule-updates-received', result.booking)
    return
  }

  window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)

  const eventName = route === 'files' && action === 'get' ? `${section}-${events[route][action]}`
    : route === 'settings' && action === 'get' ? events[route][action][section] : events[route][action]

  if (!eventsTable[eventName]) {
    console.log(...Object.keys(eventsTable))
    return console.warn('Unknown event', route, action, event.data)
  }
  if (typeof eventsTable[eventName] !== 'function') return console.warn('Error: callback is not a function', eventName, event.data)

  eventsTable[eventName](result)

  if (action === 'redirect') startRefreshing(event, refreshCallback)

  delete eventsTable[eventName]
}
