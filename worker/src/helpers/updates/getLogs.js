import { get } from '../helpers/AJAX/get'

import {
  mapRecord,
  applyUpdates,
  testRecord
} from '../helpers/updates'

export const getCustomerUpdates = async () => {
  const pages = (await get('logs?per_page=50')).pages

  let page = pages
  let done = false
  const updatesFromPartners = []
  do {
    const { result } = await get(`logs?per_page=50&page=${page--}`)

    const lastDate = Math.max(...result.map(record => record.created))

    done = lastDate < self.lastRequestTime - self.frequency

    if (done) break

    const partnersUpdates = result.filter(testRecord).map(mapRecord)

    if (!partnersUpdates || !partnersUpdates.length) continue

    partnersUpdates.map(record => record.created)

    const lastPartnersUpdates = partnersUpdates.filter(record => record.created > self.lastRequestTime)

    lastPartnersUpdates && lastPartnersUpdates.length && updatesFromPartners.push(...lastPartnersUpdates)
  } while (!done && page > 0)

  if (updatesFromPartners?.length) applyUpdates(updatesFromPartners)

  self.lastRequestTime = updatesFromPartners.length ? Math.max(updatesFromPartners.map(record => record.created)) : Date.now()
}
