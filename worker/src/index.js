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

self.clone = function (object) { return JSON.parse(JSON.stringify(object)) }
self.roundFloat = number => Math.round((number + Number.EPSILON) * 100) / 100

self.postDebugMessage = function (key, message, title) {
  self.postMessage({ status: 300, key, message, title })
}

self.errorMessage = function (errorName, statusUpdate = 500, routeToUpdate = '', actionUpdate = '', resultUpdate = null) {
  console.log(errorName)
  console.log('ERRORS:\n', require('./errors').errors)
  const {
    status = statusUpdate,
    route = routeToUpdate,
    action = actionUpdate,
    result = resultUpdate,
    errorType,
    errorMessage
  } = require('./errors').errors[errorName]

  console.log('ERROR:\n', { status, route, action, result, error: true, errorType, errorMessage })
  return {
    status,
    route,
    action,
    result,
    error: true,
    errorType,
    errorMessage
  }
}

const { testDBVersion } = require('./helpers').default

testDBVersion()

self.initialized = false
self.serviceStatus = serviceStatus

getUpdatesFromRemote()

self.onmessage = (event) => {
  if (!navigator.onLine) return self.postMessage(self.errorMessage('offline'))

  const { route, action, ...data } = event.data

  if (!routes[route]) {
    return event.target.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }

  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return event.target.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }

  routes[route][action](data)
}
