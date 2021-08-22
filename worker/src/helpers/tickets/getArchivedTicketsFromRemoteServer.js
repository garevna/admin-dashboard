import { get } from '../AJAX'
import { getShortTicketInfo } from './getShortTicketInfo'

const [route, action] = ['tickets', 'archived']

export const getArchivedTicketsFromRemoteServer = async function (year, month) {
  let currentPage = 1
  const perPage = 30

  let shortList = []

  const y = year || (new Date()).getFullYear().toString().slice(-2)
  const m = month || (new Date()).getMonth() + 1

  do {
    var { status, result } = await get(`ticket?archived=true&year=${y}&month=${m}&page=${currentPage++}&per_page=${perPage}`)

    if (status !== 200) return self.errorMessage('refreshTicketsListError')

    var { tickets, page, pages } = result

    shortList = shortList.concat(tickets.map(ticket => getShortTicketInfo(ticket)))
  } while (page < pages)

  return { status, route, action, result: shortList.sort((a, b) => b.created - a.created) }
}
