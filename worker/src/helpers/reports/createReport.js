import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
import { getSelectedFields } from './getSelectedFields'
import { initialValues } from './initialValues'

const [route, action] = ['reports', 'create']

export const createReport = async (list) => {
  clearStore('reports')

  const promises = list.map(id => get(`building/${id}`))

  const response = (await Promise.all(promises))
    .map(item => item.status === 200 ? getSelectedFields(item.result, [
      '_id',
      'address',
      'addressComponents.isSlave',
      'addressComponents.buildingType',
      'addressComponents.city',
      'coordinates',
      'numberOfDwellings',
      'internalInstallationCosts',
      'buildingConnectionCosts'
    ]) : null)

  const result = response
    .filter(item => !item.isSlave)
    .map(record => Object.assign(record, initialValues))

  await Promise.all(result.map(record => putRecordByKey('reports', record._id, record)))

  return Object.assign({ route, action, status: 200, result })
}
