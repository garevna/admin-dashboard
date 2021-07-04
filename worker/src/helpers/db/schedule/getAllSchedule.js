import { openDB } from '../openDB'
import { getAllData } from './getAllData'

export const getAllSchedule = async () => {
  const [route, action] = ['schedule', 'all']

  const { result: db } = await openDB()

  const { status, result } = await getAllData(db)

  return status !== 200 ? self.errorMessage('getScheduleError') : { status, route, action, result }
}
