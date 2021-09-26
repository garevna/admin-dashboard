import { getEstimatedServiceDeliveryTime } from './getEstimatedServiceDeliveryTime'
import { getError } from './getError'
import {
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler
} from '../../data-handlers'

const [route, action] = ['settings', 'get']

const availableSections = ['estimatedServiceDeliveryTime', 'ticketCategories', 'schedule', 'serviceProductTypes']

const availableMethods = {
  estimatedServiceDeliveryTime: getEstimatedServiceDeliveryTime,
  ticketCategories: () => ({ status: 200, route, action, result: ticketCategoriesHandler() }),
  schedule: () => ({ status: 200, route, action, result: scheduleCalendarSettingsHandler() }),
  serviceProductTypes: () => ({ status: 200, route, action, result: serviceProductTypesHandler() })
}

export const getSettings = (section, key) => {
  return availableSections.includes(section) ? availableMethods[section](key) : getError(section)
}
