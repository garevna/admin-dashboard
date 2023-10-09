import { scheduleCalendarSettingsHandler } from '../../data-handlers'
import { patch } from '../AJAX'

const [route, action, section] = ['settings', 'update', 'scheduleCalendarSettings']
const error = {
  error: true,
  errorType: 'Settings update',
  errorMessage: 'Failed to update schedule calendar settings: remote server error'
}
const message = {
  message: true,
  messageType: 'Settings update',
  messageText: 'Schedule calendar settings updated'
}

export const updateScheduleCalendarSettings = async (data) => {
  scheduleCalendarSettingsHandler(data)
  const { status, result } = await patch('settings', { scheduleCalendarSettings: data })

  const response = { status, route, action, section, result }

  return status !== 200 ? Object.assign(response, error) : Object.assign(response, message)
}
