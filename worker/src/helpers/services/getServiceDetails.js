import { getRecordByKey } from '../db'

const [route, action] = ['services', 'get']

export const getServiceDetails = async function (id) {
  const { status, result } = await getRecordByKey('services', id)

  if (status !== 200) return self.errorMessage('getServiceDetailsError')

  if (!result.partners) result.partners = []
  else {
    const promises = result.partners.map(partnerId => getRecordByKey('rsp', partnerId))
    const partners = await Promise.all(promises)
    result.partnerNames = partners
      .map(partner => partner.status === 200 ? partner.result.company.name : 'Not found')
  }

  return { status, route, action, result }
}
