const { getBuildingsByStatus } = require('../building').default

const { clearStore, putRecords /* putRecordByKey */ } = require('../db')
const { getSelectedFields } = require('./getSelectedFields')

const { createPartnersReport, initialValues } = require('../db/reports')

const [route, action] = ['reports', 'create']

const fields = [
  'id',
  'address',
  'addressComponents.isSlave',
  'addressComponents.buildingType',
  'addressComponents.city',
  'addressComponents.postCode',
  'addressComponents.buildingConnectionDate',
  'addressComponents.internalInstallationCosts',
  'addressComponents.buildingConnectionCosts',
  'numberOfDwellings'
]

const saveRecords = async (response) => {
  const buildings = response
    .map((building, index) => Object.assign(getSelectedFields(building, fields), { _id: building.id }))
    .filter(item => !item.isSlave)
    .map(record => Object.assign(record, initialValues))

  buildings.forEach(building => {
    delete building.id
    delete building.isSlave
  })

  const { status } = await putRecords('reports', buildings)

  return status
}

const getBuildings = buildingStatus => new Promise(resolve => getBuildingsByStatus(buildingStatus, response => resolve(response)))

async function * generator () {
  yield await getBuildings('lit')
  yield await getBuildings('footprint')
  yield await getBuildings('build')
  yield await getBuildings('soon')
}

export const createReport = async (resolve, reject) => {
  clearStore('reports')
  clearStore('partners')

  for await (const buildings of generator()) {
    await saveRecords(buildings)
  }

  await createPartnersReport()

  self.postMessage(Object.assign({ route, action, status: 200 }))
}
