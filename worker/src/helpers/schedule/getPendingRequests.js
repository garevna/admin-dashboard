import { getAllRecords } from '../db'

const [route, action] = ['schedule', 'pending']

export const getPendingRequests = async function () {
  const response = await getAllRecords('schedule')

  return Object.assign(response, {
    route,
    action,
    result: response.result
  })
}
