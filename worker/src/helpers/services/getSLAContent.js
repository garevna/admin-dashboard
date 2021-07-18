import { get } from '../AJAX'
import pdf404 from '../../configs/pdf404'

const notFound = {
  id: null,
  title: 'Not found',
  result: pdf404
}

export const getSLAContent = async function (id) {
  if (!id) return ({ status: 200, route: 'sla', action: 'get', result: notFound })

  const { status, result } = await get(`sla/${id}`)

  return status !== 200 ? self.errorMessage('getSLAError') : ({ status, route: 'sla', action: 'get', result })
}
