import { openDB } from '../openDB'

// import {
//   overviewTemplate,
//   getPremises,
//   createDynamic,
//   calculateMRR
// } from './'

const [route, action] = ['reports', 'overview']

export const calculateLocations = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['reports'], 'readonly')
  const store = transaction.objectStore('reports')

  const result = {}

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const record = cursor.value

        const location = record.city

        if (!result[location]) {
          result[location] = {
            totalOnNetBuildings: 0,
            premises: 0,
            connections: {
              active: 0,
              residential: 0,
              commercial: 0,
              newLastMonth: 0,
              newCurrentMonth: 0,
              pendingResidential: 0,
              pendingCommercial: 0
            },
            services: {
              active: 0,
              newLastMonth: 0,
              newCurrentMonth: 0,
              pending: 0
            }
          }
        }

        Object.assign(result[location], {
          totalOnNetBuildings: result[location].totalOnNetBuildings + 1,
          premises: result[location].premises + record.numberOfDwellings,
          connections: {
            active: result[location].connections.active + record.connections.active,
            residential: result[location].connections.residential + record.connections.residential,
            commercial: result[location].connections.commercial + record.connections.commercial,
            newLastMonth: result[location].connections.newLastMonth + record.connections.newLastMonth,
            newCurrentMonth: result[location].connections.newCurrentMonth + record.connections.newCurrentMonth,
            pendingResidential: result[location].connections.pendingResidential + record.connections.pendingResidential,
            pendingCommercial: result[location].connections.pendingCommercial + record.connections.pendingCommercial
          },
          services: {
            active: result[location].services.active + record.services.active,
            newLastMonth: result[location].services.newLastMonth + record.services.newLastMonth,
            newCurrentMonth: result[location].services.newCurrentMonth + record.services.newCurrentMonth,
            pending: result[location].services.pending + record.services.pending
          }
        })
        cursor.continue()
      } else resolve({ status: 200, route, action, result })
    }
  })
}
