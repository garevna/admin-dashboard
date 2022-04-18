import { openDB } from '../openDB'

import { overviewTemplate, calculateMRR } from './'

const [route, action] = ['reports', 'overview']

export const overview = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['reports'], 'readwrite')
  const store = transaction.objectStore('reports')

  const result = JSON.parse(JSON.stringify(overviewTemplate))

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const record = cursor.value

        const MRR = calculateMRR(record)

        for (const serviceType in record.active) {
          for (const key in record.active[serviceType]) {
            if (!result.active[serviceType][key]) result.active[serviceType][key] = 0
            result.active[serviceType][key] += record.active[serviceType][key]
          }
        }

        for (const serviceType in record.pending) {
          for (const key in record.pending[serviceType]) {
            if (!result.pending[serviceType][key]) result.pending[serviceType][key] = 0
            result.pending[serviceType][key] += record.pending[serviceType][key]
          }
        }

        const premises = {
          total: record.numberOfDwellings || 0,
          residential: record.buildingType === 'Residential' ? (record.numberOfDwellings || 0) : 0,
          commercial: record.buildingType === 'Commercial' ? (record.numberOfDwellings || 0) : 0,
          mixed: record.buildingType === 'Mixed' ? (record.numberOfDwellings || 0) : 0
        }

        Object.assign(result, {
          totalOnNetBuildings: result.totalOnNetBuildings + 1,
          premisesPassed: {
            total: result.premisesPassed.total + premises.total,
            residential: result.premisesPassed.residential + premises.residential,
            commercial: result.premisesPassed.commercial + premises.commercial,
            mixed: result.premisesPassed.mixed + premises.mixed
          },
          // customers: {
          //   residential: result.customers.residential + (record.customers.residential),
          //   commercial: result.customers.commercial + (record.customers.commercial)
          // },
          connections: {
            active: result.connections.active + record.connections.active,
            residential: result.connections.residential + (record.connections.residential),
            commercial: result.connections.commercial + (record.connections.commercial),
            newLastMonth: result.connections.newLastMonth + record.connections.newLastMonth,
            newCurrentMonth: result.connections.newCurrentMonth + record.connections.newCurrentMonth,
            pending: result.connections.pending + record.connections.pending
          },
          services: {
            active: result.services.active + record.services.active,
            newLastMonth: result.services.newLastMonth + record.services.newLastMonth,
            newCurrentMonth: result.services.newCurrentMonth + record.services.newCurrentMonth,
            pending: result.services.pending + record.services.pending
          },
          MRR: {
            lastMonth: {
              residential: result.MRR.lastMonth.residential + MRR.active.residential.lastMonth,
              commercial: result.MRR.lastMonth.commercial + MRR.active.commercial.lastMonth
            },
            currentMonth: {
              residential: result.MRR.currentMonth.residential + MRR.active.residential.currentMonth,
              commercial: result.MRR.currentMonth.commercial + MRR.active.commercial.currentMonth
            },
            pending: {
              residential: result.MRR.pending.residential + MRR.pending.residential,
              commercial: result.MRR.pending.commercial + MRR.pending.commercial
            }
          }
        })
        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result })
      }
    }
  })
}
