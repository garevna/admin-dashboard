import { put } from '../AJAX'

// import { scheduleCalendarSettingsHandler } from '../../data-handlers'

export const updateScheduleLots = async function () {
  const currentDate = new Date().toISOString().slice(0, 10)

  const { lots } = (await self.getScheduleLots()).result

  Object.keys(lots).filter(date => date >= currentDate)

  // const settings = scheduleCalendarSettingsHandler()
  //
  // const currentWeek = self.getWeekNumber(new Date())
  //
  // const response = await self.buildSchedule()
  //
  // if (response.status !== 200) return response
  //
  // const schedule = response.result
  //
  // for (const weekNumber of [currentWeek, currentWeek + 1, currentWeek + 2, currentWeek + 3]) {
  //   const dates = self.getWeekDatesByWeekNumber(weekNumber)
  //   dates.forEach((date, index) => {
  //     lots[date] = { am: true, pm: true }
  //     if (schedule[weekNumber] && schedule[weekNumber][date]) {
  //       lots[date].am = schedule[weekNumber][date].am.length < settings[index]
  //       lots[date].pm = schedule[weekNumber][date].pm.length < settings[index]
  //     }
  //   })
  // }

  return Object.assign(await put('slot', lots), { route: 'lots', action: 'put' })
}
