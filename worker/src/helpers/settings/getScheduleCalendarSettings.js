import { scheduleCalendarSettingsHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'scheduleCalendarSettings']

export const getScheduleCalendarSettings = () => ({
  status: 200,
  route,
  action,
  section,
  result: scheduleCalendarSettingsHandler()
})
