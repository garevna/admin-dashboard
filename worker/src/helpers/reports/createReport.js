// import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
import { getSelectedFields } from './getSelectedFields'
import { initialValues } from '../db/reports'

const [route, action] = ['reports', 'create']

const error = {
  route,
  action,
  error: true,
  errorType: 'Error reading buildings data',
  errorMessage: 'Channel with map.worker failed'
}

const callback = async event => {
  // self.channelPort.onmessage = null
  const { route: channel, action: channelAction, status, result: buildings } = event.data
  if (channel !== 'channel' || channelAction !== 'table') return console.warn('Unknown response from map.worker', channel, channelAction, status, buildings)

  if (status !== 200) return self.postMessage(Object.assign(error, { status }))

  const response = buildings.map(building => getSelectedFields(building, [
    'id',
    'address',
    'addressComponents.isSlave',
    'addressComponents.buildingType',
    'addressComponents.city',
    'addressComponents.buildingConnectionDate',
    'coordinates',
    'numberOfDwellings',
    'internalInstallationCosts',
    'buildingConnectionCosts'
  ]))

  const result = response
    .filter(item => !item.isSlave)
    .map(record => Object.assign(record, initialValues))

  await Promise.all(result.map(record => putRecordByKey('reports', record.id, Object.assign(record, { _id: record.id }))))

  self.postMessage(Object.assign({ route, action, status: 200, result }))
}

export const createReport = async () => {
  clearStore('reports')

  self.channelPort.postMessage({ route: 'channel', action: 'table', key: 'lit' })
  self.channelPort.onmessage = callback
}
