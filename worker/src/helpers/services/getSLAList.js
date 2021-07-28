import { get } from '../AJAX'

export const getSLAList = async function (id) {
  const { status, result } = await get('sla')

  return status !== 200 ? self.errorMessage('getSLAListError') : ({ status, route: 'sla', action: 'list', result })
}
