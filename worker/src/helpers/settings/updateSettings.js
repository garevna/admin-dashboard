import { updateEstimatedServiceDeliveryTime } from './updateEstimatedServiceDeliveryTime'
import { updateTicketCategories } from './updateTicketCategories'
import { updateScheduleCalendarSettings } from './updateScheduleCalendarSettings'
import { updateServiceProductTypes } from './updateServiceProductTypes'
// import { updateAvailableServiceStatus } from './updateAvailableServiceStatus'
import { updatePendingConnectionStatus } from './updatePendingConnectionStatus'

import { updateError } from './updateError'
import { availableSections } from './availableSections'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler,
  availableServiceStatusHandler
} from '../../data-handlers'

// const [route, action] = ['settings', 'update']

// const availableSections = ['estimatedServiceDeliveryTime', 'ticketCategories', 'schedule', 'serviceProductTypes']

const availableMethods = {
  estimatedServiceDeliveryTime: async (data) => {
    estimatedServiceDeliveryTimeHandler(data)
    return await updateEstimatedServiceDeliveryTime(data)
  },
  ticketCategories: async (data) => {
    ticketCategoriesHandler(data)
    return await updateTicketCategories(data)
  },
  scheduleCalendarSettings: async (data) => {
    scheduleCalendarSettingsHandler(data)
    return await updateScheduleCalendarSettings(data)
  },
  serviceProductTypes: async (data) => {
    serviceProductTypesHandler(data)
    return await updateServiceProductTypes(data)
  },
  pendingConnectionStatus: async (data) => {
    availableServiceStatusHandler(data)
    return await updatePendingConnectionStatus(data)
  }
}

export const updateSettings = async (section, data) => {
  return availableSections.includes(section) ? availableMethods[section](data) : await updateError(section)
}
