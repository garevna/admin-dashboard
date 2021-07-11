import { patch } from '../AJAX'

export const confirmRegistrationRequest = async (id, uniqueCode) => {
  if (!id || !uniqueCode) return self.errorMessage('invalidRequest')

  const { status } = await patch(`user/${id}`, {
    approved: true,
    uniqueCode
  })

  if (status !== 200) return self.errorMessage('approveRequestError')

  return Object.assign(await self.getRegistrationRequests(), {
    route: 'rsp',
    action: 'confirm-registration-request'
  })
}
