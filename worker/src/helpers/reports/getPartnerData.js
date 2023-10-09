import { getRecordByKey } from '../db'

const { dynamics } = require('../db/reports')

const [route, action] = ['reports', 'get-partner-data']

export const getPartnerData = async partnerId => {
  const { status, result } = await getRecordByKey('partners', partnerId)

  if (!result.dynamic.length) return { status, route, action, result: null }

  dynamics.init()
  dynamics.reduce(result.dynamic)

  const targets = dynamics.get()

  return { status, route, action, result: targets }
}
