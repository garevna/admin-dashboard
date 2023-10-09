const { openDB } = require('../../openDB')
const { roundFloat, dynamics } = require('../lib')

const [route, action] = ['reports', 'get-buildings-by-postcode']

module.exports = async function (postcode) {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const result = []

  const transaction = db.transaction(['reports'], 'readonly')
  const store = transaction.objectStore('reports')

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result

      dynamics.init()

      if (cursor) {
        const {
          postCode,
          address,
          buildingType,
          buildingConnectionCosts = 0,
          internalInstallationCosts = 0,
          connections,
          numberOfDwellings: premisesPassed,
          dynamic: buildingDynamic
        } = cursor.value

        if (postCode === postcode) {
          let accumulated = 0
          dynamics.reduce(buildingDynamic)
          const { dynamic } = dynamics.get()

          for (const date in dynamic) accumulated += dynamic[date]

          const MRR = dynamic[new Date().toISOString().slice(0, 7)] || 0

          const totalSpent = buildingConnectionCosts + internalInstallationCosts

          const uptake = premisesPassed ? roundFloat(connections.active * 100 / premisesPassed) : 0
          const ARPU = connections.active ? roundFloat(MRR / connections.active) : 0

          result.push({
            postCode,
            address,
            buildingType,
            premisesPassed: premisesPassed || 0,
            activeConnections: connections.active,
            MRR,
            totalSpent,
            ROI: roundFloat(accumulated - totalSpent),
            uptake,
            ARPU
          })
        }
        cursor.continue()
      } else resolve({ status: 200, route, action, result })
    }
  })
}
