import { scheduleCalendarSettingsHandler } from '../../data-handlers'

// import { updateScheduleSettingsError } from '../../errors'

export const getScheduleSettings = function () {
  // const { settings } = (await self.getScheduleLots()).result
  // scheduleSettingsHandler(settings)

  // const { status } = await self.updateScheduleLots()
  // if (status !== 200) return Object.assign({ status }, updateScheduleSettingsError)

  return {
    status: 200,
    route: 'schedule',
    action: 'settings',
    result: scheduleCalendarSettingsHandler()
  }
}
