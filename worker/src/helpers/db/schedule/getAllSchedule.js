import { openDB } from '../openDB'
import { getAllData } from './getAllData'

const [route, action] = ['schedule', 'all']

export const getAllSchedule = async () => {
  const { result: db } = await openDB()

  const { status, result } = await getAllData(db)

  return status !== 200 ? self.errorMessage('getScheduleError') : { status, route, action, result }
}
