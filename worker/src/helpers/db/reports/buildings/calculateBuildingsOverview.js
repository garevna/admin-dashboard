const { openDB } = require('../../openDB')
const { roundFloat, dynamics } = require('../lib')
const { buildingsDynamicHolder } = require('../handlers/buildingsDynamicHolder')

const emptyRecord = {
  premisesPassed: 0,
  totalSpent: 0,
  MRR: 0,
  ROI: 0,
  activeCustomers: 0
}

const [route, action] = ['reports', 'calculate-buildings-data']

module.exports = async function () {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const result = {}
  buildingsDynamicHolder.init()

  const transaction = db.transaction(['reports'], 'readwrite')
  const store = transaction.objectStore('reports')

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result

      if (cursor) {
        const building = cursor.value

        const {
          postCode,
          numberOfDwellings = 0,
          buildingConnectionCosts,
          internalInstallationCosts,
          connections,
          dynamic,
          pending
        } = building

        dynamics.init()
        dynamics.reduce(dynamic)

        buildingsDynamicHolder.addRecord(postCode, dynamics.get(), pending)

        if (!result[postCode]) result[postCode] = JSON.parse(JSON.stringify(emptyRecord))

        const {
          premisesPassed,
          totalSpent,
          activeCustomers
        } = result[postCode]

        Object.assign(result[postCode], {
          premisesPassed: premisesPassed + numberOfDwellings,
          totalSpent: totalSpent + (buildingConnectionCosts || 0) + (internalInstallationCosts || 0),
          activeCustomers: activeCustomers + connections.active
        })

        cursor.continue()
      } else {
        Object.keys(result).forEach(postcode => {
          const { dynamic, MRR } = buildingsDynamicHolder.getRecord(postcode)

          const accumulatedDynamic = Object.keys(dynamic).reduce((res, date) => res + dynamic[date], 0)

          const ROI = roundFloat(accumulatedDynamic - result[postcode].totalSpent)

          Object.assign(result[postcode], {
            MRR,
            ROI,
            uptake: result[postcode].premisesPassed ? roundFloat(result[postcode].activeCustomers * 100 / result[postcode].premisesPassed) : 0,
            ARPU: result[postcode].activeCustomers ? roundFloat(MRR / result[postcode].activeCustomers) : 0
          })
        })

        resolve({ status: 200, route, action, result })
      }
    }
  })
}
