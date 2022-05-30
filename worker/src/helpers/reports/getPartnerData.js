import { getRecordByKey } from '../db'
import { generateDates, roundFloat } from '../db/reports'

const getMinDate = data => Array.from(new Set(data.map(item => item.date).sort()))[0]
const getSchema = minDate => Object.assign({}, ...generateDates(minDate).map(date => ({ [date]: 0 })))

const [route, action] = ['reports', 'get-partner-data']

export const getPartnerData = async partnerId => {
  const { status, result } = await getRecordByKey('partners', partnerId)

  if (!result.active.length) return { status, route, action, result: null }

  const minDate = getMinDate(result.active)

  const targets = {
    dynamic: getSchema(minDate),
    residentialDynamic: getSchema(minDate),
    commercialDynamic: getSchema(minDate)
  }

  for (const key in targets) {
    const section = key === 'dynamic' ? result.active : result.active.filter(record => record.serviceType === key.slice(0, -7))
    for (const date in targets[key]) {
      for (const record of section) {
        if (date < record.date) continue
        targets[key][date] += parseFloat(record.subscriptionFee)
      }
    }
  }

  for (const key in targets) {
    for (const date in targets[key]) {
      targets[key][date] = roundFloat(targets[key][date])
    }
  }

  return { status, route, action, result: targets }
}
