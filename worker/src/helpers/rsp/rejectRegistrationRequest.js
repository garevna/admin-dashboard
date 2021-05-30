import { post } from '../AJAX'
import { getRegistrationRequests } from './'

export const rejectRegistrationRequest = async (id) => {
  /* const { status, result } = */ await post(`registration/reject/${id}`)
  // self.postMessage({ status: 300, response: { status, result } })
  return await getRegistrationRequests()
}
