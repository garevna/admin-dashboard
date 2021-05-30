import { get } from '../AJAX'

export const getRegistrationRequests = async () => {
  return Object.assign(await get('registration'), { route: 'rsp', action: 'registration' })
}
