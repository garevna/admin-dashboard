import { getRecordByKey } from '../db'
import { generateDates, roundFloat } from '../db/reports'

const [route, action] = ['reports', 'get-partner-data']

export const getPartnerData = async partnerId => {
  const { status, result } = await getRecordByKey('partners', partnerId)

  if (!result.active.length) return { status, route, action, result: null }

  const minDate = Array.from(new Set(result.active.map(item => item.date).sort()))[0]

  const dynamic = Object.assign({}, ...generateDates(minDate).map(date => ({ [date]: 0 })))

  for (const date in dynamic) {
    for (const record of result.active) {
      if (date < record.date) continue
      dynamic[date] += parseFloat(record.subscriptionFee)
    }
  }

  for (const date in dynamic) {
    dynamic[date] = roundFloat(dynamic[date])
  }

  return { status, route, action, result: dynamic }
}
