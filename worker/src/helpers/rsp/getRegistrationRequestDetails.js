import { get } from '../AJAX'

export const getRegistrationRequestDetails = async (id) => {
  return Object.assign(await get(`user/${id}`), { route: 'rsp', action: 'registration-request-details' })
}
