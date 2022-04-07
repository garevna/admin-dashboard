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
      'addressComponents.buildingType',
      'numberOfDwellings',
      'internalInstallationCosts',
      'buildingConnectionCosts'
    ]) : null)

  const result = response.map(record => Object.assign(record, initialValues))

  // const result = response.map(record => Object.assign(record, initialValues, {
  //   premisesPassed: {
  //     residential: record.buildingType === 'Residential' ? record.numberOfDwellings : 0,
  //     commercial: record.buildingType === 'Commercial' ? record.numberOfDwellings : 0,
  //     mixed: record.buildingType === 'Mixed' ? record.numberOfDwellings : 0
  //   }
  // }))

  await Promise.all(response.map(record => putRecordByKey('reports', record._id, record)))

  return Object.assign({ route, action, status: 200, result })
}
