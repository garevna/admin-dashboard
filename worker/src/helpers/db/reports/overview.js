import { openDB } from '../openDB'

import {
  overviewTemplate,
  getPremises,
  createDynamic,
  calculateMRR
} from './'

import { initialValues } from '../../reports/initialValues'

const [route, action] = ['reports', 'overview']

export const overview = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['reports'], 'readwrite')
  const store = transaction.objectStore('reports')

  const result = {
    totalOnNetBuildings: 0,
    premisesPassed: JSON.parse(JSON.stringify(overviewTemplate.premisesPassed)),
    connections: JSON.parse(JSON.stringify(initialValues.connections)),
    services: JSON.parse(JSON.stringify(initialValues.services))
  }

  const [active, pending] = [[], []]

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const record = cursor.value

        active.push(...record.active)
        pending.push(...record.pending)

        result.totalOnNetBuildings += 1

        const premisesPassed = getPremises(record)
        const { connections, services } = record
        const sections = { premisesPassed, connections, services }

        for (const section of Object.keys(sections)) {
          for (const key of Object.keys(sections[section])) {
            Object.assign(result[section], { [key]: result[section][key] + sections[section][key] })
          }
        }

        cursor.continue()
      } else {
        const dates = Array.from(new Set(active.map(service => service.date)))

        Object.assign(result, {
          dynamic: createDynamic(dates, active),
          residentialDynamic: createDynamic(dates, active.filter(item => item.serviceType === 'residential')),
          commercialDynamic: createDynamic(dates, active.filter(item => item.serviceType === 'commercial'))
        })

        const MRR = calculateMRR(active, pending)

        Object.assign(result, { MRR })

        resolve({ status: 200, route, action, result })
      }
    }
  })
}
