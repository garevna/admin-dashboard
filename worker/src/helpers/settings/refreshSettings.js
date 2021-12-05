import { get } from '../AJAX'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler,
  availableServiceStatusHandler,
  pendingConnectionStatusHandler,
  serviceStatusIconsHandler
} from '../../data-handlers'

const [route, action, section] = ['settings', 'refresh', 'all']

export const refreshSettings = async function () {
  const { status, result } = await get('settings')

  if (status !== 200) return self.errorMessage('refreshSettingsError')

  const {
    estimatedServiceDeliveryTime,
    ticketCategories,
    scheduleCalendarSettings,
    serviceProductTypes,
    availableServiceStatus,
    pendingConnectionStatus,
    serviceStatusIcons
  } = result

  estimatedServiceDeliveryTimeHandler(estimatedServiceDeliveryTime)
  ticketCategoriesHandler(ticketCategories)
  scheduleCalendarSettingsHandler(scheduleCalendarSettings)
  serviceProductTypesHandler(serviceProductTypes)
  availableServiceStatusHandler(availableServiceStatus)
  pendingConnectionStatusHandler(pendingConnectionStatus)
  serviceStatusIconsHandler(serviceStatusIcons)

  return {
    status,
    route,
    action,
    section,
    result: {
      estimatedServiceDeliveryTime,
      ticketCategories,
      scheduleCalendarSettings,
      serviceProductTypes,
      availableServiceStatus,
      pendingConnectionStatus,
      serviceStatusIcons
    }
  }
}
