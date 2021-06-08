import { getAllSchedule } from '../db/schedule'

export const getInstallationSchedule = async function () {
  const [route, action] = ['schedule', 'get']

  const response = await getAllSchedule()

  if (response.status !== 200) return response

  const result = {}

  const schedule = response.result.filter(item => item.serviceStatus === 'In job queue')

  for (const record of schedule) {
    if (!record.installation || !record.installation.date || !record.installation.period) continue
    const { date, period } = record.installation

    const weekNumber = self.getWeekNumber(record.installation.date)
    if (!result[weekNumber]) result[weekNumber] = {}
    if (!result[weekNumber][date]) result[weekNumber][date] = {}
    if (!result[weekNumber][date][period]) result[weekNumber][date][period] = []
    result[weekNumber][date][period].push(record)
  }

  return { status: 200, route, action, result }
}
