import { getAllSchedule } from '../db/schedule'

export const getInstallationSchedule = async function () {
  const [route, action] = ['schedule', 'get']

  const response = await getAllSchedule()

  // self.postMessage({ status: 300, route, action, title: 'RESPONSE', result: response })

  if (response.status !== 200) return response

  const result = {}

  const schedule = response.result.filter(item => item.serviceStatus === 'In job queue')

  // self.postMessage({ status: 300, route, action, title: 'FILTERED', schedule })

  for (const record of schedule) {
    if (!record.installation || !record.installation.date || !record.installation.period) continue
    const { date, period } = record.installation

    const weekNumber = self.getWeekNumber(record.installation.date)
    if (!result[weekNumber]) result[weekNumber] = {}
    if (!result[weekNumber][date]) result[weekNumber][date] = {}
    if (!result[weekNumber][date][period]) result[weekNumber][date][period] = []
    result[weekNumber][date][period].push(record)
  }

  // self.postMessage({ status: 300, route, action, title: 'INSTALLATION SCHEDULE:\n', result })

  return { status: 200, route, action, result }
}
