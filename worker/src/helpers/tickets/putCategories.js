import { put } from '../AJAX'

import { ticketCategories } from '../data-handlers'

export const putCategories = async function (data) {
  const [route, action] = ['categories', 'put']

  const { status, result } = await put('dictionary/ticket-categories', ticketCategories())

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Ticket categories',
    messageText: 'Data updated'
  }
}
