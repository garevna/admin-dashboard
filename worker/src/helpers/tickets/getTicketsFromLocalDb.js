import { getAllRecords } from '../db'
const { getTicketsListError } = require('../error-handlers').default

export const getTicketsFromLocalDb = async function () {
  const [route, action] = ['tickets', 'list']

  const { status, result } = await getAllRecords('tickets')

  if (status !== 200) return getTicketsListError(status)
  return { status, route, action, result }
}
