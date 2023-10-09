const { openDB } = require('../../openDB')
const { initialValues } = require('../templates')
// const { locationDynamicHolder } = require('../handlers')

const [route, action] = ['reports', 'locations']

module.exports = async function () {
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

        const location = record.city.toUpperCase()

        if (!result[location]) {
          result[location] = {
            totalOnNetBuildings: 0,
            premises: 0,
            connections: self.__clone(initialValues.connections),
            services: self.__clone(initialValues.services),
            dynamic: {},
            pending: []
          }
        }
        if (!result[location].dynamic) result[location].dynamic = []
        if (!result[location].pending) result[location].pending = []

        result[location].totalOnNetBuildings += 1
        result[location].premises += record.numberOfDwellings || 0

        record.dynamic.forEach(item => {
          for (const date in item.data) {
            if (!result[location].dynamic[date]) result[location].dynamic[date] = 0
            Object.assign(result[location].dynamic, { [date]: self.__roundFloat(result[location].dynamic[date] + item.data[date]) })
          }
        })

        result[location].pending.push(...record.pending)

        for (const section of ['connections', 'services']) {
          for (const key in result[location][section]) {
            result[location][section][key] += record[section][key]
          }
        }

        cursor.continue()
      } else resolve({ status: 200, route, action, result })
    }
  })
}
