import { get } from '../AJAX'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  serviceProductTypesHandler
} from '../../data-handlers'

const [route, action] = ['settings', 'refresh']

export const refreshSettings = async function () {
  const { status, result } = await get('settings')

  if (status !== 200) return self.errorMessage('refreshSettingsError')

  const {
    estimatedServiceDeliveryTime,
    ticketCategories,
    schedule,
    serviceProductTypes
  } = result

  estimatedServiceDeliveryTimeHandler(estimatedServiceDeliveryTime)
  ticketCategoriesHandler(ticketCategories)
  scheduleCalendarSettingsHandler(schedule)
  serviceProductTypesHandler(serviceProductTypes)

  return {
    status,
    route,
    action,
    result: {
      estimatedServiceDeliveryTime,
      ticketCategories,
      schedule
    }
  }
}
