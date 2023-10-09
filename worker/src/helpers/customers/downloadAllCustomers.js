import { get } from '../AJAX'
import { clearStore, putRecords } from '../db'

const [route, action] = ['customers', 'refresh']

let startDownload = null

export const downloadAllCustomers = async function () {
  if (startDownload) return console.warn('DOWNLOAD CUSTOMERS ALLREADY STARTED: ', startDownload)
  else startDownload = Date.now()

  const perPage = 800

  let [currentPage, done] = [1, false]

  await clearStore('customers')

  while (!done) {
    const { status, result: customers, page, pages } = await get(`customer?page=${currentPage++}&per_page=${perPage}`)
    if (status !== 200) return self.errorMessage('refreshCustomersListError')

    done = page >= pages

    const response = await putRecords('customers', customers)

    if (response.status !== 200) self.errorMessage('refreshCustomersListError')
  }

  return { status: 200, route, action, result: 'OK' }
}
