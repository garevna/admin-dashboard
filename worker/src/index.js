import { routes } from './configs'
import { serviceStatus } from './configs/serviceStatus'

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

self.errorMessage = function (errorName) {
  const { errorType, errorMessage } = require('./errors')[errorName]
  return {
    status: 500,
    error: true,
    errorType,
    errorMessage
  }
}

const { testDBVersion } = require('./helpers').default

testDBVersion()

self.initialized = false

self.serviceStatus = serviceStatus

self.onmessage = (event) => {
  // if (!navigator.onLine) return self.postMessage(self.errorMessage('offline'))
  const { route, action, ...data } = event.data

  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return event.target.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }
  routes[route][action](data)
}
