import { availableSections } from './availableSections'

import {
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler,
  availableServiceStatusHandler,
  pendingConnectionStatusHandler,
  serviceStatusIconsHandler,
  buildingSettingsHandler
} from '../../data-handlers'

import {
  getEstimatedServiceDeliveryTime,
  getScheduleCalendarSettings,
  getTicketCategories,
  getAvailableServiceStatus,
  getPendingConnectionStatus,
  getServiceStatusIcons,
  getServiceProductTypes,
  getBuildingSettings
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
  buildingSettings: getBuildingSettings,
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
      serviceStatusIcons: serviceStatusIconsHandler(),
      buildingSettings: buildingSettingsHandler()
    }
  })
}

export const getSettings = (section, key) => {
  return section && availableSections.includes(section) ? availableMethods[section](key) : availableMethods.all()
}
