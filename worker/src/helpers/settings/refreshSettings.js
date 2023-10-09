// import { get } from '../AJAX'

import {
  hostHandler,
  apiKeyHandler,
  // credentialsHandler
  defaultAdminCredsHandler
} from '../env'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler,
  availableServiceStatusHandler,
  pendingConnectionStatusHandler,
  serviceStatusIconsHandler,
  buildingSettingsHandler,
  accessSettingsHandler
} from '../../data-handlers'

const [route, action, section] = ['settings', 'refresh', 'all']

export const refreshSettings = async function () {
  // const { status, result } = await get('settings')

  const response = await fetch(`${hostHandler()}/settings`, {
    method: 'GET',
    headers: {
      Authorization: apiKeyHandler(),
      Credentials: defaultAdminCredsHandler()
    }
  })

  if (response.status !== 200) return self.errorMessage('refreshSettingsError')

  const result = await response.json()

  const {
    estimatedServiceDeliveryTime,
    ticketCategories,
    scheduleCalendarSettings,
    serviceProductTypes,
    availableServiceStatus,
    pendingConnectionStatus,
    serviceStatusIcons,
    buildingCategory,
    buildingClass,
    buildingType,
    access,
    dashboard,
    roles
  } = result.data

  estimatedServiceDeliveryTimeHandler(estimatedServiceDeliveryTime)
  ticketCategoriesHandler(ticketCategories)
  scheduleCalendarSettingsHandler(scheduleCalendarSettings)
  serviceProductTypesHandler(serviceProductTypes)
  availableServiceStatusHandler(availableServiceStatus)
  pendingConnectionStatusHandler(pendingConnectionStatus)
  serviceStatusIconsHandler(serviceStatusIcons)
  buildingSettingsHandler({ buildingCategory, buildingClass, buildingType })
  accessSettingsHandler({ access, roles, dashboard })

  return {
    status: 200,
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
      serviceStatusIcons,
      buildingSettings: buildingSettingsHandler(),
      accessSettings: accessSettingsHandler()
    }
  }
}
