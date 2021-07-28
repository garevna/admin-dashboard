import { remove } from '../AJAX'

export const rejectRegistrationRequest = async ({ id }) => {
  const response = await remove(`user/${id}`)

  if (response.status !== 200) return self.errorMessage('rejectRequestError')

  await self.getResellersFromRemoteServer()

  return await self.getRegistrationRequests()
}
