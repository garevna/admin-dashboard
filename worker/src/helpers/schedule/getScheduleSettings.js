import { scheduleSettings } from '../data-handlers'

// import { updateScheduleSettingsError } from '../../errors'

export const getScheduleSettings = async function () {
  const { settings } = (await self.getScheduleLots()).result

  scheduleSettings(settings)

  // const { status } = await self.updateScheduleLots()
  // if (status !== 200) return Object.assign({ status }, updateScheduleSettingsError)

  return {
    status: 200,
    route: 'schedule',
    action: 'settings',
    result: scheduleSettings()
  }
}
