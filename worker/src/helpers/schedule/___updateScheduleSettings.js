import { patch } from '../AJAX'

import { scheduleCalendarSettingsHandler } from '../../data-handlers'

import { invalidRequest, updateScheduleSettingsError } from '../../errors'

const invalidRequestError = Object.assign({}, invalidRequest, {
  route: 'schedule',
  action: 'config'
})

export const updateScheduleSettings = async function (data) {
  if (!Array.isArray(data) || data.length !== 7 || data.filter(item => typeof item !== 'number').length) return invalidRequestError

  scheduleCalendarSettingsHandler(data)

  const response = await patch('slot', { settings: data })

  if (response.status !== 200) return Object.assign(response, updateScheduleSettingsError)

  const { status /*, result */ } = await self.updateScheduleLots()

  if (status !== 200) return Object.assign(response, updateScheduleSettingsError)

  // self.postDebugMessage({ result })

  return Object.assign(response, {
    route: 'schedule',
    action: 'config',
    message: true,
    messageType: 'Schedule settings',
    messageText: 'Settings refreshed'
  })
}
