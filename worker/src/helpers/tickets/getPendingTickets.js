import { getAllRecords } from '../db'

const [route, action] = ['tickets', 'pending']

export const getPendingTickets = async function () {
  const { status, result } = await getAllRecords('tickets')

  if (status !== 200) return self.errorMessage('getTicketsListError')

  const response = result
    .filter(item => item.history && item.history.length && item.history.slice(-1)[0].source === 'partner')

  return { status, route, action, result: response }
}
