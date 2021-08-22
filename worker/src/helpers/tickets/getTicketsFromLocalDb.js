import { getAllRecords } from '../db'

const [route, action] = ['tickets', 'list']

export const getTicketsFromLocalDb = async function (category) {
  const { status, result } = await getAllRecords('tickets')

  if (status !== 200) return self.errorMessage('getTicketsListError')

  return { status, route, action, result: category ? result.filter(item => item.category === category) : result }
}
