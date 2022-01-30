import { routes } from './configs'
import { serviceStatus } from './configs/serviceStatus'
import { credentialsHandler } from './helpers/env'

import {
  // getNotifications,
  getNotificationsAll,
  getCustomerUpdates,
  getTicketUpdates,
  getMessagesUpdates,
  getPartnerUpdates,
  getRegistrationUpdates
} from './helpers/updates'

import {
  getWeekNumber,
  getWeekDay,

  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

// const { updatesController } = require('./controllers').default

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
self.frequency = 30000

const getUpdatesFromRemote = async () => {
  if (credentialsHandler()) {
    const { result: fullListOfNotifications } = await getNotificationsAll()
    // const { result: currentDateNotifications } = await getNotifications()

    const response = await Promise.all([
      getCustomerUpdates(fullListOfNotifications),
      getTicketUpdates(fullListOfNotifications),
      getMessagesUpdates(fullListOfNotifications),
      getPartnerUpdates(fullListOfNotifications),
      getRegistrationUpdates()
    ])

    self.postMessage({ status: 200, route: 'updates', action: 'get', result: response })
  }
  setTimeout(getUpdatesFromRemote, self.frequency)
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
