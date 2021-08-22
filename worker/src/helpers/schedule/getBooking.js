import { getAllSchedule } from '../db/schedule'

export const getBooking = async function () {
  const [route, action] = ['booking', 'get']

  const response = await getAllSchedule()

  if (response.status !== 200) return response

  const records = response.result.filter(record => record.request === 'booking')

  // self.postDebugMessage({ booking: records.sort((a, b) => b.modified - a.modified).map(item => new Date(item.modified).toISOString().slice(0, 10)) })

  return { status: 200, route, action, result: records.sort((a, b) => b.modified - a.modified) }
}
