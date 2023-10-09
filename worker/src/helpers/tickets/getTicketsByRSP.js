import { getAllRecords } from '../db'

export const getTicketsByRSP = async function (resellerId) {
  const [route, action] = ['tickets', 'rsp']

  const { status, result } = await getAllRecords('tickets')

  if (status !== 200) return self.errorMessage('getTicketsListError')

  return { status, route, action, result: result.filter(item => item.resellerId === resellerId) }
}
