import { ticketCategoriesHandler } from '../../data-handlers'

export const getTicketCategories = () => ({
  status: 200,
  result: ticketCategoriesHandler(),
  route: 'categories',
  action: 'get'
})
