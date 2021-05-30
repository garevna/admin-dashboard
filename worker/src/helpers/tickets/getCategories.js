import { ticketCategories } from '../data-handlers'

export const getCategories = async () => ({
  status: 200,
  result: ticketCategories(),
  route: 'categories',
  action: 'get'
})
