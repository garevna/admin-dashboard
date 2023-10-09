import { uniqueCodeList, uniqueCodes } from '../data-handlers'

export const refreshPartnersList = async () => {
  const response = await self.getResellersFromRemoteServer()
  if (response.status !== 200) return response

  uniqueCodes([])
  response.result.forEach(partner => {
    uniqueCodeList(partner._id, partner.uniqueCode)
    uniqueCodes(partner.uniqueCode)
  })
  return await self.getResellersList()
}
