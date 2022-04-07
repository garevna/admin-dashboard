import { openDB } from '../openDB'

// import { pendingConnectionStatusHandler } from '../../../data-handlers'

// import { getDate, currentMonth, lastMonth } from './'

const [route, action] = ['reports', 'overview']

export const overview = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['reports'], 'readwrite')
  const store = transaction.objectStore('reports')

  const result = {
    totalOnNetBuildings: 0,
    premisesPassed: {
      total: 0,
      residential: 0,
      commercial: 0,
      mixed: 0
    },
    connections: {
      activeLastMonth: 0,
      activeCurrentMonth: 0,
      pendingCurrentMonth: 0
    },
    services: {
      activeLastMonth: 0,
      activeCurrentMonth: 0,
      pendingCurrentMonth: 0
    },
    mrr: 0
  }

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const building = cursor.value

        Object.assign(result, {
          totalOnNetBuildings: result.totalOnNetBuildings + 1,
          premisesPassed: {
            total: result.premisesPassed.total + building.numberOfDwellings,
            residential: result.premisesPassed.residential + building.buildingType === 'Residential' ? building.numberOfDwellings : 0,
            commercial: result.premisesPassed.commercial + building.buildingType === 'Commercial' ? building.numberOfDwellings : 0,
            mixed: result.premisesPassed.mixed + building.buildingType === 'Mixed' ? building.numberOfDwellings : 0
          },
          connections: {
            activeLastMonth: result.connections.activeLastMonth + building.newActiveConnections.lastMoth,
            activeCurrentMonth: result.connections.activeCurrentMonth + building.newActiveConnections.currentMoth,
            pendingCurrentMonth: 0
          },
          services: {
            activeLastMonth: result.services.activeLastMonth + building.newActiveServices.lastMoth,
            activeCurrentMonth: result.services.activeCurrentMonth + building.newActiveServices.currentMoth,
            pendingCurrentMonth: result.services.pendingCurrentMonth + building.pendingServices.currentMoth
          },
          mrr: result.mrr + Object.keys(building.active).reduce((accum, key) => accum + building.active[key])
        })
        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
