import { getRecordByKey } from '../db'
import { put } from '../AJAX'

export const confirmRegistrationRequest = async ({ id }) => {
  const { status: stat, result: request } = await getRecordByKey('rsp', id)

  if (stat !== 200) return self.errorMessage('getUserDetailsError')

  request.userInfo.approved = true

  const { status } = await put(`user/${id}`, request)

  if (status !== 200) return self.errorMessage('approveRequestError')

  return await self.getRegistrationRequests()
}
