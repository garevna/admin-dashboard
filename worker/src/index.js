import { routes } from './configs'
import { serviceStatus } from './configs/serviceStatus'

import { getUpdatesFromRemote } from './helpers/getUpdatesFromRemote'

import {
  getWeekNumber,
  getWeekDay,

  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

Object.assign(self, {
  getWeekNumber,
  getWeekDay,

  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
})

self.postDebugMessage = function (message) {
  self.postMessage(Object.assign(message, { status: 300 }))
}

self.errorMessage = function (errorName, status = 500, action = '') {
  const { route = '', errorType, errorMessage } = require('./errors')[errorName]
  return {
    status,
    route,
    action,
    error: true,
    errorType,
    errorMessage
  }
}

const { testDBVersion } = require('./helpers').default

testDBVersion()

self.initialized = false
self.serviceStatus = serviceStatus
self.access = {
  updates: false,
  messages: false,
  customers: false,
  buildings: false,
  services: false,
  tickets: false,
  schedule: false
}

getUpdatesFromRemote()

self.onmessage = (event) => {
  if (!navigator.onLine) return self.postMessage(self.errorMessage('offline'))

  const { route, action, ...data } = event.data

  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return event.target.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }
  routes[route][action](data)
}
