import { get } from '../AJAX'

export const getRegistrationRequestDetails = async (id) => {
  return Object.assign(await get(`registration/${id}`), { route: 'rsp', action: 'registration-request-details' })
}
