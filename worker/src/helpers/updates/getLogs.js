import { get } from '../helpers/AJAX/get'

import {
  mapRecord,
  applyUpdates,
  testRecord
  // formatRecord,
  // formatTime
} from '../helpers/updates'

// import { remoteServerError } from '../errors'

// const [route, action] = ['updates', 'logs']
// const remoteError = Object.assign(remoteServerError, { route, action })

export const getCustomerUpdates = async () => {
  const pages = (await get('logs?per_page=50')).pages

  let page = pages
  let done = false
  const updatesFromPartners = []
  do {
    const { result } = await get(`logs?per_page=50&page=${page--}`)

    const lastDate = Math.max(...result.map(record => record.created))

    done = lastDate < self.lastRequestTime - self.frequency

    // self.postDebugMessage({ lastDate: new Date(lastDate).toLocaleString(), done })

    if (done) break

    const partnersUpdates = result.filter(testRecord).map(mapRecord)

    // self.postDebugMessage({ page, partnersUpdates: partnersUpdates.map(formatRecord) })

    if (!partnersUpdates || !partnersUpdates.length) continue

    /* const times = */ partnersUpdates.map(record => record.created)

    // self.postDebugMessage({ lastRequestTime: formatTime(self.lastRequestTime), times: times.map(time => formatTime(time)) })

    const lastPartnersUpdates = partnersUpdates.filter(record => record.created > self.lastRequestTime)

    // self.postDebugMessage({ lastPartnersUpdates })

    lastPartnersUpdates && lastPartnersUpdates.length && updatesFromPartners.push(...lastPartnersUpdates)
  } while (!done && page > 0)

  if (updatesFromPartners?.length) applyUpdates(updatesFromPartners)

  // self.postDebugMessage({ updates: updatesFromPartners.map(formatRecord) })
  // self.postDebugMessage({ lastRequestDateBefore: formatTime(self.lastRequestTime) })
  self.lastRequestTime = updatesFromPartners.length ? Math.max(updatesFromPartners.map(record => record.created)) : Date.now()
  // self.postDebugMessage({ lastRequestDateAfter: formatTime(self.lastRequestTime) })
}
