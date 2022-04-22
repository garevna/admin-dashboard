import {
  getNotificationsAll,
  getCustomerUpdates,
  getTicketUpdates,
  getMessagesUpdates,
  getPartnerUpdates,
  getRegistrationUpdates,
  getBuildingUpdates
} from './updates'

import { access } from '../configs'

import { dateChangeCallback } from './dateChangeCallback'

import { credentialsHandler } from './env'

const frequency = 30000

let startDate = new Date().toISOString().slice(0, 10)
let dateChanged = false

const [route, action] = ['updates', 'get']

export const getUpdatesFromRemote = async () => {
  if (credentialsHandler() && access.updates) {
    const currentDate = new Date().toISOString().slice(0, 10)
    dateChanged = currentDate > startDate

    startDate = dateChanged ? currentDate : startDate

    if (dateChanged) dateChangeCallback()

    const { result: fullListOfNotifications } = await getNotificationsAll()

    const response = await Promise.all([
      getCustomerUpdates(fullListOfNotifications),
      getTicketUpdates(fullListOfNotifications),
      getMessagesUpdates(fullListOfNotifications),
      getPartnerUpdates(fullListOfNotifications),
      getRegistrationUpdates(),
      getBuildingUpdates(fullListOfNotifications)
    ])

    const updates = Object.assign({}, ...response.map(item => ({ [item.action]: item.result })))

    self.postMessage({ status: 200, route, action, result: updates })
  }
  setTimeout(getUpdatesFromRemote, frequency)
}
