import { availableSections } from './availableSections'

import {
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler,
  availableServiceStatusHandler,
  pendingConnectionStatusHandler,
  serviceStatusIconsHandler
} from '../../data-handlers'

import {
  getEstimatedServiceDeliveryTime,
  getScheduleCalendarSettings,
  getTicketCategories,
  getAvailableServiceStatus,
  getPendingConnectionStatus,
  getServiceStatusIcons,
  getServiceProductTypes
} from './methods'

const [route, action] = ['settings', 'get']

const availableMethods = {
  estimatedServiceDeliveryTime: getEstimatedServiceDeliveryTime,
  ticketCategories: getTicketCategories,
  scheduleCalendarSettings: getScheduleCalendarSettings,
  serviceProductTypes: getServiceProductTypes,
  availableServiceStatus: getAvailableServiceStatus,
  pendingConnectionStatus: getPendingConnectionStatus,
  serviceStatusIcons: getServiceStatusIcons,
  all: () => ({
    status: 200,
    route,
    action,
    section: 'all',
    result: {
      estimatedServiceDeliveryTime: getEstimatedServiceDeliveryTime(),
      ticketCategories: ticketCategoriesHandler(),
      scheduleCalendarSettings: scheduleCalendarSettingsHandler(),
      serviceProductTypes: serviceProductTypesHandler(),
      availableServiceStatus: availableServiceStatusHandler(),
      pendingConnectionStatus: pendingConnectionStatusHandler(),
      serviceStatusIcons: serviceStatusIconsHandler()
    }
  })
}

export const getSettings = (section, key) => {
  return section && availableSections.includes(section) ? availableMethods[section](key) : availableMethods.all()
}
