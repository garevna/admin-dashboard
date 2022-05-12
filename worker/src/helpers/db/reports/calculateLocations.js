import { openDB } from '../openDB'

import { initialValues } from '../../reports/initialValues'
import { generateDates, createDynamic, locationDynamicHolder } from './'

const [route, action] = ['reports', 'locations']

export const calculateLocations = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['reports'], 'readonly')
  const store = transaction.objectStore('reports')

  const result = {}
  const locationDynamic = {}
  const [active, pending] = [{}, {}]

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const record = cursor.value

        const location = record.city.toUpperCase()

        if (!result[location]) {
          result[location] = {
            totalOnNetBuildings: 0,
            premises: 0,
            connections: JSON.parse(JSON.stringify(initialValues.connections)),
            services: JSON.parse(JSON.stringify(initialValues.services))
          }
        }
        if (!active[location]) active[location] = []
        if (!pending[location]) pending[location] = []

        result[location].totalOnNetBuildings += 1
        result[location].premises += record.numberOfDwellings

        active[location].push(...record.active)
        pending[location].push(...record.pending)

        for (const section of ['connections', 'services']) {
          for (const key in result[location][section]) {
            result[location][section][key] += record[section][key]
          }
        }

        cursor.continue()
      } else {
        const tmp = Object.keys(active)
          .flatMap(location => Array.from(new Set(active[location].map(item => item.date))))
        const sortedDates = Array.from(new Set(tmp)).sort()

        const [minDate, maxDate] = [sortedDates[0], sortedDates.slice(-1)[0]]

        const dates = generateDates(minDate)

        for (const location in active) {
          Object.assign(locationDynamic, { [location]: createDynamic(dates, active[location]) })
          Object.assign(result[location], { MRR: locationDynamic[location][maxDate] })
        }

        locationDynamicHolder(locationDynamic)

        resolve({ status: 200, route, action, result })
      }
    }
  })
}
