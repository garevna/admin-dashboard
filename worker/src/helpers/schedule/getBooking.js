import { getAllSchedule } from '../db/schedule'

export const getBooking = async function () {
  const [route, action] = ['booking', 'get']

  const response = await getAllSchedule()

  if (response.status !== 200) return response

  const records = response.result.filter(record => record.request === 'booking')

  return { status: 200, route, action, result: records.sort((a, b) => b.modified - a.modified) }
}
