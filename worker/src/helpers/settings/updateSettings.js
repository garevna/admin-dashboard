import { updateEstimatedServiceDeliveryTime } from './updateEstimatedServiceDeliveryTime'
import { updateTicketCategories } from './updateTicketCategories'
import { updateScheduleCalendarSettings } from './updateScheduleCalendarSettings'
import { updateServiceProductTypes } from './updateServiceProductTypes'

import { updateError } from './updateError'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler
} from '../../data-handlers'

// const [route, action] = ['settings', 'update']

const availableSections = ['estimatedServiceDeliveryTime', 'ticketCategories', 'schedule', 'serviceProductTypes']

const availableMethods = {
  estimatedServiceDeliveryTime: async (data) => {
    estimatedServiceDeliveryTimeHandler(data)
    return await updateEstimatedServiceDeliveryTime(data)
  },
  ticketCategories: async (data) => {
    ticketCategoriesHandler(data)
    return await updateTicketCategories(data)
  },
  schedule: async (data) => {
    scheduleCalendarSettingsHandler(data)
    return await updateScheduleCalendarSettings(data)
  },
  serviceProductTypes: async (data) => {
    serviceProductTypesHandler(data)
    return await updateServiceProductTypes(data)
  }
}

export const updateSettings = async (section, data) => {
  return availableSections.includes(section) ? availableMethods[section](data) : await updateError(section)
}
