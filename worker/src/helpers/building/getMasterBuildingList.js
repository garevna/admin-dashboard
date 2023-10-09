import { get } from '../AJAX'

const [route, action] = ['building', 'details']

const getSelectedFields = (record, fields) => {
  const result = {}
  for (const field of fields) {
    const parts = field.split('.')
    if (parts.length === 2) result[parts[1]] = record[parts[0]][parts[1]]
    else result[field] = record[field]
  }
  return result
}

export async function getMasterBuildingList (list, props) {
  const promises = list.map(id => get(`building/${id}`))
  const response = await Promise.all(promises)

  const result = response
    .map(item => item.status === 200 ? getSelectedFields(item.result, props) : null)

  return Object.assign({ route, action, status: 200, result })
}
