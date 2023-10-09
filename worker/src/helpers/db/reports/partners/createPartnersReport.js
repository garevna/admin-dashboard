const { putRecordByKey } = require('../../')

const { initialValues } = require('../templates')

const [route, action] = ['reports', 'partners-creation']

module.exports = async () => {
  const { result } = await self.getResellersShortList()

  const partners = result.map(partner => Object.assign({ _id: partner.id, name: partner.name, uniqueCode: partner.uniqueCode }, initialValues))

  await Promise.all(partners.map(partner => putRecordByKey('partners', partner._id, partner)))

  return Object.assign({ status: 200, route, action, result: partners })
}
