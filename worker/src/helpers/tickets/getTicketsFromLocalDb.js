import { getAllRecords } from '../db'

export const getTicketsFromLocalDb = async function () {
  const [route, action] = ['tickets', 'list']

  const { status, result } = await getAllRecords('tickets')

  if (status !== 200) return self.errorMessage('getTicketsListError')
  return { status, route, action, result }
}
