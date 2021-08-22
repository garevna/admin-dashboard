import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
// import { getShortTicketInfo } from './getShortTicketInfo'

const [route, action] = ['tickets', 'refresh']

export const getTicketsFromRemoteServer = async function () {
  let currentPage = 1
  const perPage = 30

  // const shortList = []

  await clearStore('tickets')

  do {
    var { status, result } = await get(`ticket?page=${currentPage++}&per_page=${perPage}`)

    if (status !== 200) return self.errorMessage('refreshTicketsListError')

    var { ticketCategories: categories, tickets, page, pages } = result

    self.postDebugMessage({ categories, tickets, page, pages })

    // shortList.concat(tickets.map(ticket => getShortTicketInfo(ticket)))

    const promises = tickets.map(record => putRecordByKey('tickets', record._id, record))
    const response = await Promise.all(promises)
    if (response.filter(item => item.status !== 200).length) self.errorMessage('refreshTicketsListError')
  } while (page < pages)

  // shortList.sort((a, b) => a.created - b.created)

  return { status, route, action, result: { ticketCategories: categories } }
}
