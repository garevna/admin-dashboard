import { get } from '../AJAX'
import { ticketCategories } from '../data-handlers'

const ticketCategoriesError = {
  error: true,
  errorType: 'Ticket categories',
  errorMessage: 'Error reading the data from remote server'
}

export const refreshCategories = async () => {
  const { status, result } = await get('dictionary/ticket-categories')
  const response = { status, route: 'categories', action: 'refresh', result }

  self.postDebugMessage({ result })

  status === 200 && ticketCategories(result)
  return status === 200 ? response : Object.assign(response, ticketCategoriesError)
}
