import { getAllRecords } from '../db'

const [route, action] = ['tickets', 'list']

export const getTicketsFromLocalDb = async function (category) {
  const response = await self.getResellersList()

  if (response.status !== 200) return response

  const partners = response.result.map(partner => partner._id)

  const { status, result: tickets } = await getAllRecords('tickets')

  if (status !== 200) return self.errorMessage('getTicketsListError')

  const result = tickets.filter(ticket => partners.includes(ticket.resellerId))

  return { status, route, action, result: category ? result.filter(item => item.category === category) : result }
}
