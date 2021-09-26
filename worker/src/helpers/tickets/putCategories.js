import { put } from '../AJAX'
import { ticketCategoriesHandler } from '../../data-handlers'

const ticketCategoriesMessage = {
  message: true,
  messageType: 'Ticket categories',
  messageText: 'Data updated'
}

const ticketCategoriesError = {
  error: true,
  errorType: 'Ticket categories',
  errorMessage: 'Error saving the data to remote server'
}

export const putCategories = async (data) => {
  const { status, result } = await put('dictionary/ticket-categories', data)
  const response = { status, route: 'categories', action: 'put', result }

  status === 200 && ticketCategoriesHandler(data)

  return Object.assign(response, status === 200 ? ticketCategoriesMessage : ticketCategoriesError)
}
