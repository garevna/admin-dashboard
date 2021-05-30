import { routes } from './configs'

import { testDBVersion } from './helpers'

import {
  getWeekNumber,
  getWeekStartDate,
  getWeekEndDate,

  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

Object.assign(self, {
  getWeekNumber,
  getWeekStartDate,
  getWeekEndDate,

  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
})

testDBVersion()

self.initialized = false

self.onmessage = (event) => {
  const { route, action, ...data } = event.data

  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return event.target.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }
  routes[route][action](data)
}
