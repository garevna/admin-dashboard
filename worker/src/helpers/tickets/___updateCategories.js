import { put } from '../AJAX'
import { ticketCategories } from '../data-handlers'

const ticketCategoriesError = {
  error: true,
  errorType: 'Ticket categories',
  errorMessage: 'Error saving the data to remote server'
}

export const refreshCategories = async (data) => {
  self.postDebugMessage({ categories: data })

  const { status, result } = await put('dictionary/ticket-categories', data)
  const response = { status, route: 'categories', action: 'update', result }

  self.postDebugMessage({ result })

  status === 200 && ticketCategories(data)
  return status === 200 ? response : Object.assign(response, ticketCategoriesError)
}
