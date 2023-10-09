import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

const [route, action] = ['tickets', 'refresh']

export const getTicketsFromRemoteServer = async function () {
  let currentPage = 1
  const perPage = 30

  await clearStore('tickets')

  do {
    var { status, result } = await get(`ticket?page=${currentPage++}&per_page=${perPage}`)

    if (status !== 200) return self.errorMessage('refreshTicketsListError')

    var { tickets, page, pages } = result

    const promises = tickets.map(record => putRecordByKey('tickets', record._id, record))

    const response = await Promise.all(promises)

    if (response.filter(item => item.status !== 200).length) self.errorMessage('refreshTicketsListError')
  } while (page < pages)

  return { status, route, action }
}
