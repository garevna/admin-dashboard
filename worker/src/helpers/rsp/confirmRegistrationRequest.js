import { post } from '../AJAX'
import { getRegistrationRequests } from './'

export const confirmRegistrationRequest = async (id) => {
  /* const { status, result } = */ await post(`registration/accept/${id}`)
  // self.postMessage({ status: 300, response: { status, result } })
  return await getRegistrationRequests()
}
