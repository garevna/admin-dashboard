import { get } from '../../AJAX'
import { putRecordByKey } from '../../db'

const getRoute = record => record.endpoint.indexOf('/customer') !== -1 ? 'customers'
  : record.endpoint.indexOf('/ticket') !== -1 ? 'tickets'
    : record.endpoint.indexOf('/user') !== -1 ? 'rsp' : null

export const applyUpdates = async updates => {
  const routes = updates.map(getRoute)

  const response = await Promise.all(updates.map(record => get(record.endpoint.slice(1))))

  await Promise.all(response.map((record, index) => putRecordByKey(routes[index], record.result._id, record.result)))
}
