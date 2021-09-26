import { ticketCategoriesHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'ticketCategories']

export const getScheduleCalendarSettings = () => ({
  status: 200,
  route,
  action,
  section,
  result: ticketCategoriesHandler()
})
