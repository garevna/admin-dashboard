import { ticketCategoriesHandler } from '../../data-handlers'
import { patch } from '../AJAX'

const [route, action, section] = ['settings', 'update', 'ticketCategories']
const error = {
  error: true,
  errorType: 'Settings update',
  errorMessage: 'Failed to update ticket categories: remote server error'
}
const message = {
  message: true,
  messageType: 'Settings update',
  messageText: 'Ticket categories updated'
}

export const updateTicketCategories = async (data) => {
  ticketCategoriesHandler(data)
  const { status, result } = await patch('settings', { ticketCategories: data })

  const response = { status, route, action, section, result }

  return status !== 200 ? Object.assign(response, error) : Object.assign(response, message)
}
