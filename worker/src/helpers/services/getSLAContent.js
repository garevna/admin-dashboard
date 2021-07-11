import { get } from '../AJAX'

export const getSLAContent = async function (id) {
  const { status, result } = await get(`sla/${id}`)

  return status !== 200 ? self.errorMessage('getSLAError') : ({ status, route: 'sla', action: 'get', result })
}
