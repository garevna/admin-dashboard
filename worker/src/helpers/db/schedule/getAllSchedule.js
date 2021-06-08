import { openDB } from '../openDB'
import { getAllData } from './getAllData'

const { getScheduleError } = require('../../error-handlers').default

export const getAllSchedule = async () => {
  const [route, action] = ['schedule', 'all']

  const { result: db } = await openDB()

  const { status, result } = await getAllData(db)

  return status !== 200 ? getScheduleError(status) : { status, route, action, result }
}
