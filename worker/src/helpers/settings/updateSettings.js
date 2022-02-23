import { updateEstimatedServiceDeliveryTime } from './updateEstimatedServiceDeliveryTime'
import { updateTicketCategories } from './updateTicketCategories'
import { updateScheduleCalendarSettings } from './updateScheduleCalendarSettings'
import { updateServiceProductTypes } from './updateServiceProductTypes'
// import { updateAvailableServiceStatus } from './updateAvailableServiceStatus'
import { updatePendingConnectionStatus } from './updatePendingConnectionStatus'
import { updateBuildingSettings } from './updateBuildingSettings'

import { updateError } from './updateError'
import { availableSections } from './availableSections'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler,
  availableServiceStatusHandler,
  buildingSettingsHandler
} from '../../data-handlers'

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
  },
  buildingSettings: async (data) => {
    buildingSettingsHandler(data)
    return await updateBuildingSettings(data)
  }
}

export const updateSettings = async (section, data) => {
  return availableSections.includes(section) ? availableMethods[section](data) : await updateError(section)
}
