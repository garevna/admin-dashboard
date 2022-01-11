import { patch } from '../AJAX'

const [route, action] = ['rsp', 'confirm-registration-request']

export const confirmRegistrationRequest = async (id, uniqueCode) => {
  if (!id || !uniqueCode) return self.errorMessage('invalidRequest')

  const { status, result } = await patch(`user/${id}`, {
    approved: true,
    uniqueCode
  })

  if (status !== 200) return self.errorMessage('approveRequestError')

  return {
    status: 200,
    route,
    action,
    result,
    message: true,
    messageType: 'Leads request confirmation',
    messageText: `New partner approved with unique code ${uniqueCode}`
  }
}
