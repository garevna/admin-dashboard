import { put } from '../AJAX'

import { scheduleCalendarSettingsHandler } from '../../data-handlers'

const [route, action] = ['lots', 'add']

const error = {
  route,
  action,
  error: true,
  errorType: 'Create new schedule lot'
}

const error422 = Object.assign({}, error, {
  status: 422,
  errorMessage: `Date is earlier then current date ${new Date().toISOString().slice(0, 10)}`
})

export const createNewScheduleLot = async function (date, period = 'am') {
  const currentDate = new Date().toISOString().slice(0, 10)
  if (date < currentDate) return error422

  const { result: lots } = await self.getScheduleLots()

  Object.keys(lots).filter(date => date >= currentDate)

  if (!Object.keys(lots).includes(date)) lots[date] = { am: [], pm: [] }

  const settings = scheduleCalendarSettingsHandler()[self.getWeekDatesByWeekNumber(self.getWeekNumber(date))]

  if (lots[date][period].length >= settings) {
    return Object.assign({}, error, {
      status: 409,
      errorMessage: `There are already ${lots[date][period].length} lots for this date: ${date}`
    })
  }

  lots[date][period].push(true)

  return Object.assign(await put('slot', lots), { route, action })
}
