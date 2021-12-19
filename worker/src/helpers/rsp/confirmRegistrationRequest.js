import { patch } from '../AJAX'

const [route, action] = ['rsp', 'confirm-registration-request']

export const confirmRegistrationRequest = async (id, uniqueCode) => {
  if (!id || !uniqueCode) return self.errorMessage('invalidRequest')

  const { status /*, result */ } = await patch(`user/${id}`, {
    approved: true,
    uniqueCode
  })

  // self.postDebugMessage({ newPartner: result })

  if (status !== 200) return self.errorMessage('approveRequestError')

  const { result: partners } = await self.getResellersFromRemoteServer()

  // self.postDebugMessage({ partners })

  // const registrationRequests = await self.getRegistrationRequests()

  // self.postDebugMessage({ registrationRequests })

  return {
    status: 200,
    route,
    action,
    result: partners,
    message: true,
    messageType: 'Leads request confirmation',
    messageText: `New partner approved with unique code ${uniqueCode}`
  }
}
