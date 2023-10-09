import { getAllSchedule } from '../db/schedule'

export const buildSchedule = async function () {
  const [route, action] = ['schedule', 'get']

  let response = await getAllSchedule()

  if (response.status !== 200) {
    const refresh = await self.refreshSchedule()
    if (refresh.status !== 200) return self.errorMessage('refreshScheduleError')
    response = refresh.result
  }

  const records = response.result.filter(record => record.request === 'scheduling')

  const dates = records.flatMap(record => record.status === 'In job queue' ? [record.installation.date] : [record.lots[0].date, record.lots[1].date])

  const weeks = Object.assign({}, ...Array.from(new Set(dates.map(date => self.getWeekNumber(date))))
    .map(number => ({ [number]: self.getWeekDatesByWeekNumber(number).reduce((accum, date) => Object.assign(accum, { [date]: { am: [], pm: [], afterhours: [] } }), {}) })))

  for (const index in records) {
    const record = records[index]

    const weekNumbers = record.status === 'In job queue'
      ? [self.getWeekNumber(record.installation.date)]
      : [self.getWeekNumber(record.lots[0].date), self.getWeekNumber(record.lots[1].date)]

    const dates = record.status === 'In job queue'
      ? [record.installation.date]
      : [record.lots[0].date, record.lots[1].date]

    const periods = record.status === 'In job queue'
      ? [record.installation.period]
      : [record.lots[0].period, record.lots[1].period]

    weekNumbers.forEach((number, index) => {
      weeks[number][dates[index]][periods[index]].push(record)
    })
  }

  return { status: 200, route, action, result: weeks }
}
