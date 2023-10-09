import { get } from '../AJAX'
import pdf404 from '../../configs/pdf404'

const [route, action] = ['sla', 'get']

const notFound = {
  status: 404,
  route,
  action,
  result: pdf404,
  error: true,
  errorType: 'SLA',
  errorMessage: 'SLA file was not found'
}

export const getSLAContent = async function (id) {
  if (!id) return ({ status: 200, route: 'sla', action: 'get', result: notFound })

  const { status, result } = await get(`sla/${id}`)

  return status !== 200 ? notFound : ({ status, route, action, result })
}
